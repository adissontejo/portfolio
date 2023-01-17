import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { useMediaQuery } from '~/hooks';
import { Drawers } from '~/types';

import { useStylesContext } from './styles';

export type DrawersContextType = {
  activeDrawer?: Drawers;
  setActiveDrawer: Dispatch<SetStateAction<Drawers>>;
  columnWidth: number;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const [activeDrawer, setActiveDrawer] = useState<Drawers>();

  const { theme } = useStylesContext();

  const isMobile = useMediaQuery(theme.queries.mediumAndLower);

  const columnWidth = isMobile ? 20 : 60;

  return (
    <DrawersContext.Provider
      value={{ activeDrawer, setActiveDrawer, columnWidth }}
    >
      {children}
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
