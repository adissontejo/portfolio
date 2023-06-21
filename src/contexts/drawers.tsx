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
import { AnimatePresence, Target, TargetAndTransition } from 'framer-motion';
import disableScroll from 'disable-scroll';

import { useScreens } from '~/hooks';
import { DrawerId } from '~/data';
import { AnimationStates } from '~/types';

type ScreenId = DrawerId | 'home';

type NavigationType = 'load' | 'back' | 'forward';

type AnimationType = 'initial' | 'animate' | 'exit';

type AnimationKeys =
  | `${NavigationType}${Capitalize<AnimationType>}`
  | AnimationType
  | 'default';

type AnimationProps = Partial<Record<AnimationType, TargetAndTransition>> & {
  initial?: Target;
};

type AnimationVariants = Partial<Record<AnimationKeys, TargetAndTransition>> & {
  [Property in `${NavigationType}Initial` | 'initial' | 'default']: Target;
};

type AnimationsFunctionProps = Partial<Record<NavigationType, AnimationProps>> &
  AnimationProps;

type VariantsFunctionProps = Partial<Record<NavigationType, AnimationProps>> &
  AnimationProps & { default?: Target };

export interface DrawersContextType {
  activeDrawer: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  transitioning: boolean;
  columnWidth: number;
  prevScreen: ScreenId;
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  animationType: 'load' | 'back' | 'forward';
  navigationType: NavigationType;
  animationStates: AnimationStates;
  animations: (config: AnimationsFunctionProps) => AnimationProps;
  variants: (config: VariantsFunctionProps) => AnimationVariants;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: (id: DrawerId) => void;
}

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

  const navigationType = useRef<NavigationType>('load');
  const prevScreen = useRef<ScreenId>(null);
  const currentScreen = useRef<ScreenId>(getCurrentScreen());
  const screenHistory = useRef<ScreenId[]>(
    currentScreen.current === 'home'
      ? ['home']
      : ['home', currentScreen.current]
  );

  const screens = useScreens();

  const columnWidth = screens.sm ? 60 : 20;

  const animationStates = {
    initial: [
      'default',
      'initial',
      navigationType.current !== 'back' ? 'enterInitial' : '',
      `${navigationType.current}Initial`,
    ],
    animate: [
      'default',
      'animate',
      navigationType.current !== 'back' ? 'enterAnimate' : '',
      `${navigationType.current}Animate`,
    ],
    exit: [
      'default',
      'exit',
      navigationType.current !== 'back' ? 'enterExit' : '',
      `${navigationType.current}Exit`,
    ],
  } as AnimationStates;

  const animations = (config: AnimationsFunctionProps): AnimationProps => {
    return {
      initial: {
        ...config.initial,
        ...config[navigationType.current]?.initial,
      },
      animate: {
        ...config.animate,
        ...config[navigationType.current]?.animate,
      },
      exit: {
        ...config.exit,
        ...config[navigationType.current]?.exit,
      },
    };
  };

  const variants = (config: VariantsFunctionProps): AnimationVariants => {
    return {
      default: config.default,
      loadInitial: config.load?.initial,
      loadAnimate: config.load?.animate,
      loadExit: config.load?.exit,
      backInitial: config.back?.initial,
      backAnimate: config.back?.animate,
      backExit: config.back?.exit,
      forwardInitial: config.forward?.initial,
      forwardAnimate: config.forward?.animate,
      forwardExit: config.forward?.exit,
      initial: config.initial,
      animate: config.animate,
      exit: config.exit,
    };
  };

  const openDrawer = (id: DrawerId) => {
    disableScroll.on();

    navigationType.current = 'forward';
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

    navigationType.current = 'back';
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
        animationType: navigationType.current,
        navigationType: navigationType.current,
        prevScreen: prevScreen.current,
        currentScreen: currentScreen.current,
        screenHistory: screenHistory.current,
        animations,
        variants,
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
