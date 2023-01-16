import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { Drawers } from '~/types';

export type DrawersContextType = {
  activeDrawer?: Drawers;
  setActiveDrawer: Dispatch<SetStateAction<Drawers>>;
};

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const [activeDrawer, setActiveDrawer] = useState<Drawers>();

  return (
    <DrawersContext.Provider value={{ activeDrawer, setActiveDrawer }}>
      {children}
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
