import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import disableScroll from 'disable-scroll';

import { useMediaQuery } from '~/hooks';
import { DrawerId } from '~/data';
import { AnimationStates } from '~/types';

import { useStylesContext } from './styles';

type ScreenId = DrawerId | 'home';

export type DrawersContextType = {
  activeDrawer: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  transitioning: boolean;
  columnWidth: number;
  prevScreen: ScreenId;
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  animationType: 'load' | 'back' | 'forward';
  animationStates: AnimationStates;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: (id: DrawerId) => void;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<DrawerId>(null);
  const [transitioning, setTransitioning] = useState(false);

  const getCurrentScreen = () => {
    const drawers: DrawerId[] = ['contact', 'experiences', 'qualifications'];

    for (let i = 0; i < drawers.length; i++) {
      const regex = new RegExp(`^/${drawers[i]}.*$`);

      if (router.pathname.match(regex)) {
        return drawers[i];
      }
    }

    return 'home';
  };

  const animationType = useRef<'load' | 'back' | 'forward'>('load');
  const prevScreen = useRef<ScreenId>(null);
  const currentScreen = useRef<ScreenId>(getCurrentScreen());
  const screenHistory = useRef<ScreenId[]>(
    currentScreen.current === 'home'
      ? ['home']
      : ['home', currentScreen.current]
  );

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.small);

  const columnWidth = isMobile ? 20 : 60;

  const animationStates = {
    initial: [
      'all',
      'initial',
      animationType.current !== 'back' ? 'enterInitial' : '',
      `${animationType.current}Initial`,
    ],
    animate: [
      'all',
      'animate',
      animationType.current !== 'back' ? 'enterAnimate' : '',
      `${animationType.current}Animate`,
    ],
    exit: [
      'all',
      'exit',
      animationType.current !== 'back' ? 'enterExit' : '',
      `${animationType.current}Exit`,
    ],
  } as AnimationStates;

  const openDrawer = (id: DrawerId) => {
    disableScroll.on();

    animationType.current = 'forward';
    prevScreen.current = getCurrentScreen();
    currentScreen.current = id;

    screenHistory.current.push(id);

    setActiveDrawer(id);
    setTransitioning(true);

    router.replace(`/${id}`);
  };

  const closeDrawer = async () => {
    if (screenHistory.current.length < 2) {
      return;
    }

    disableScroll.on();

    animationType.current = 'back';
    prevScreen.current = screenHistory.current.pop();
    currentScreen.current =
      screenHistory.current[screenHistory.current.length - 1];

    setActiveDrawer(prevScreen.current as DrawerId);
    setTransitioning(true);

    router.replace(
      currentScreen.current === 'home' ? '/' : `/${currentScreen.current}`
    );
  };

  useEffect(() => {
    if (!transitioning) {
      disableScroll.off();
    }
  }, [transitioning]);

  return (
    <DrawersContext.Provider
      value={{
        activeDrawer,
        setActiveDrawer,
        transitioning,
        columnWidth,
        animationStates,
        animationType: animationType.current,
        prevScreen: prevScreen.current,
        currentScreen: currentScreen.current,
        screenHistory: screenHistory.current,
        openDrawer,
        closeDrawer,
      }}
    >
      <AnimatePresence onExitComplete={() => setTransitioning(false)}>
        {children}
      </AnimatePresence>
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
