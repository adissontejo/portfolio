import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

import { ScreenId } from '~/data';
import { useSyncEffect } from '~/hooks';
import { getScreenFromPathname } from '~/lib';

import { useDrawersContext } from './drawers';

type ExitType = 'forward' | 'back';
type EnterType = 'load' | ExitType;

export interface ScreenContextData {
  id: ScreenId;
  enterType: EnterType;
  exitType: ExitType;
  entering: boolean;
  exiting: boolean;
}

const ScreenContext = createContext<ScreenContextData>({
  id: 'home',
  enterType: 'load',
  exitType: 'forward',
  entering: true,
  exiting: false,
});

export interface ScreenProviderProps {
  pathname: string;
  children?: ReactNode;
}

export const ScreenProvider = ({ pathname, children }: ScreenProviderProps) => {
  const id = useRef(getScreenFromPathname(pathname)).current;
  const enterType = useRef<EnterType>('load');
  const exitType = useRef<ExitType>('forward');

  const { prevScreen, currentScreen, navigationType, transitioning } =
    useDrawersContext();

  const entering = useMemo(() => {
    return currentScreen === id && transitioning;
  }, [currentScreen, transitioning]);

  const exiting = useMemo(() => {
    return prevScreen === id && transitioning;
  }, [prevScreen, transitioning]);

  useSyncEffect(() => {
    if (currentScreen === id) {
      enterType.current = navigationType;
    } else {
      exitType.current = navigationType as ExitType;
    }
  }, [currentScreen, navigationType]);

  const animationStates = {
    initial: [`${enterType.current}-initial`],
    animate: [`${enterType.current}-animate`],
    exit: [`${exitType.current}-exit`],
  };

  return (
    <ScreenContext.Provider
      value={{
        id,
        enterType: enterType.current,
        exitType: exitType.current,
        entering,
        exiting,
      }}
    >
      <motion.div className="contents" {...animationStates}>
        {children}
      </motion.div>
    </ScreenContext.Provider>
  );
};

export const useScreenContext = () => useContext(ScreenContext);
