import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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
  columnWidth: number;
  isInitialPage: boolean;
  openDrawer: (id: Drawers) => void;
  closeDrawer: (id: Drawers) => void;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<Drawers>();

  const isInitialPage = useRef(true);

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.small);

  const columnWidth = isMobile ? 20 : 60;

  const openDrawer = (id: Drawers) => {
    setActiveDrawer(id);

    isInitialPage.current = false;

    router.push(`/${id}`);
  };

  const closeDrawer = async (id: Drawers) => {
    setActiveDrawer(id);

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

    const listener = () => {
      setActiveDrawer(null);

      router.events.off('routeChangeComplete', listener);
    };

    router.events.on('routeChangeComplete', listener);
  };

  return (
    <DrawersContext.Provider
      value={{
        activeDrawer,
        setActiveDrawer,
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
