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

import { useMediaQuery } from '~/hooks';
import { DrawerId } from '~/data';

import { useStylesContext } from './styles';

export type DrawersContextType = {
  activeDrawer?: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  transitioning: boolean;
  setTransitioning: Dispatch<SetStateAction<boolean>>;
  columnWidth: number;
  isInitialPage: boolean;
  animationType: 'load' | 'back' | 'forward';
  exitingDrawer: DrawerId;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: (id: DrawerId) => void;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<DrawerId>(null);
  const [transitioning, setTransitioning] = useState(false);

  const isInitialPage = useRef(true);
  const actionQueue = useRef<{
    type: 'open' | 'close';
    id: DrawerId;
  }>(null);
  const animationType = useRef<'load' | 'back' | 'forward'>('load');
  const exitingDrawer = useRef<DrawerId>(null);

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.small);

  const columnWidth = isMobile ? 20 : 60;

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

    exitingDrawer.current = null;

    animationType.current = 'forward';

    setActiveDrawer(id);

    setTransitioning(true);

    isInitialPage.current = false;

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

    exitingDrawer.current = id;

    animationType.current = 'back';

    setActiveDrawer(id);

    setTransitioning(true);

    router.replace('/');
  };

  useEffect(() => {
    if (!transitioning && actionQueue.current) {
      if (actionQueue.current.type === 'open') {
        openDrawer(actionQueue.current.id);
      } else {
        closeDrawer(actionQueue.current.id);
      }

      actionQueue.current = null;
    }
  }, [transitioning]);

  return (
    <DrawersContext.Provider
      value={{
        activeDrawer,
        setActiveDrawer,
        transitioning,
        setTransitioning,
        columnWidth,
        isInitialPage: isInitialPage.current,
        animationType: animationType.current,
        exitingDrawer: exitingDrawer.current,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
