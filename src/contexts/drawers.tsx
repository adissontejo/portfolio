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
  openDrawer: (id: Drawers) => void;
  closeDrawer: (id: Drawers) => void;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<Drawers>(null);
  const [transitioning, setTransitioning] = useState(false);

  const isInitialPage = useRef(true);
  const drawerQueue = useRef<Drawers>(null);

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.small);

  const columnWidth = isMobile ? 20 : 60;

  const openDrawer = (id: Drawers) => {
    if (transitioning && id !== activeDrawer) {
      drawerQueue.current = id;

      return;
    }

    setActiveDrawer(id);

    setTransitioning(true);

    isInitialPage.current = false;

    router.push(`/${id}`);
  };

  const closeDrawer = async (id: Drawers) => {
    if (router.pathname !== `/${id}`) {
      return;
    }

    setActiveDrawer(id);

    setTransitioning(true);

    if (isInitialPage.current) {
      isInitialPage.current = false;

      history.pushState(null, '', `/${id}`);

      await router.push(`/${id}?id=2`, `/${id}`);

      await router.replace(`/${id}`);

      router.back();

      router.replace('/');
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (!transitioning && drawerQueue.current) {
      openDrawer(drawerQueue.current);

      drawerQueue.current = null;
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
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
