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

export type DrawersContextType = {
  activeDrawer: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  transitioning: boolean;
  columnWidth: number;
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

  const actionQueue = useRef<{
    type: 'open' | 'close';
    id: DrawerId;
  }>(null);
  const animationType = useRef<'load' | 'back' | 'forward'>('load');

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
    if (router.pathname === `/${id}`) {
      return;
    }

    if (transitioning) {
      actionQueue.current = {
        type: 'open',
        id,
      };

      return;
    }

    disableScroll.on();

    animationType.current = 'forward';
    setActiveDrawer(id);
    setTransitioning(true);

    router.replace(`/${id}`);
  };

  const closeDrawer = async (id: DrawerId) => {
    if (router.pathname !== `/${id}`) {
      return;
    }

    if (transitioning) {
      actionQueue.current = {
        type: 'close',
        id,
      };

      return;
    }

    disableScroll.on();

    animationType.current = 'back';
    setActiveDrawer(id);
    setTransitioning(true);

    router.replace('/');
  };

  useEffect(() => {
    if (!transitioning) {
      disableScroll.off();

      if (actionQueue.current) {
        if (actionQueue.current.type === 'open') {
          openDrawer(actionQueue.current.id);
        } else {
          closeDrawer(actionQueue.current.id);
        }

        actionQueue.current = null;
      }
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
