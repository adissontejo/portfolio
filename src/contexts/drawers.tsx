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
import { Drawers } from '~/types';

import { useStylesContext } from './styles';

export type DrawersContextType = {
  activeDrawer?: Drawers;
  setActiveDrawer: Dispatch<SetStateAction<Drawers>>;
  transitioning: boolean;
  setTransitioning: Dispatch<SetStateAction<boolean>>;
  columnWidth: number;
  isInitialPage: boolean;
  animationType: 'load' | 'back' | 'forward';
  openDrawer: (id: Drawers) => void;
  closeDrawer: (id: Drawers) => void;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<Drawers>(null);
  const [transitioning, setTransitioning] = useState(false);

  const isInitialPage = useRef(true);
  const actionQueue = useRef<{
    type: 'open' | 'close';
    id: Drawers;
  }>(null);
  const animationType = useRef<'load' | 'back' | 'forward'>('load');

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.small);

  const columnWidth = isMobile ? 20 : 60;

  const openDrawer = (id: Drawers) => {
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

    animationType.current = 'forward';

    setActiveDrawer(id);

    setTransitioning(true);

    isInitialPage.current = false;

    router.replace(`/${id}`);
  };

  const closeDrawer = async (id: Drawers) => {
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

    animationType.current = 'back';

    setActiveDrawer(id);

    setTransitioning(true);

    router.replace('/');
  };

  useEffect(() => {
    console.log(actionQueue.current);

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
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
