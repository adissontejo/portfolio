import { createContext, ReactNode, useContext, useRef } from 'react';
import { motion } from 'framer-motion';

import { ScreenId } from '~/data';
import { useSyncEffect } from '~/hooks';
import { getScreenFromPathname } from '~/lib';

import { AnimationType, NavigationType, useDrawersContext } from './drawers';

type EnterType = NavigationType;
type ExitType = Exclude<NavigationType, 'load'>;

type AnimationStates = Record<AnimationType, string>;

export interface ScreenContextData {
  screenId: ScreenId;
  enterType: EnterType;
  exitType: ExitType;
  animationStates: AnimationStates;
}

const ScreenContext = createContext<ScreenContextData>(null);

export interface ScreenProviderProps {
  pathname: string;
  children?: ReactNode;
}

export const ScreenProvider = ({ pathname, children }: ScreenProviderProps) => {
  const enterType = useRef<EnterType>('load');
  const enterFrom = useRef<ScreenId>(null);
  const exitType = useRef<ExitType>('forward');
  const exitTo = useRef<ScreenId>(null);

  const { prevScreen, currentScreen, navigationType } = useDrawersContext();

  const id = useSyncEffect(() => getScreenFromPathname(pathname), []);

  useSyncEffect(() => {
    if (currentScreen === id) {
      enterType.current = navigationType;

      enterFrom.current = prevScreen;
    } else if (prevScreen === id) {
      exitType.current = navigationType as ExitType;

      exitTo.current = currentScreen;
    }
  }, [prevScreen, currentScreen]);

  const animationStates = {
    initial: `${enterType.current}-initial`,
    animate: `${enterType.current}-animate`,
    exit: `${exitType.current}-exit`,
  };

  return (
    <ScreenContext.Provider
      value={{
        screenId: id,
        enterType: enterType.current,
        exitType: exitType.current,
        animationStates: {
          ...animationStates,
          whileInView: `${enterType.current}-whileInView`,
        },
      }}
    >
      <motion.div className="contents" {...animationStates}>
        {children}
      </motion.div>
    </ScreenContext.Provider>
  );
};

export const useScreenContext = () => {
  const context = useContext(ScreenContext);

  if (context === null) {
    throw new Error('Must be used with ScreenProvider');
  }

  return context;
};
