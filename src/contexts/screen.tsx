import { createContext, ReactNode, useContext, useRef } from 'react';
import { motion } from 'framer-motion';

import { ScreenId } from '~/data';
import { useSyncEffect } from '~/hooks';
import { getScreenFromPathname } from '~/lib';

import {
  AnimationType,
  NavigationType,
  useDrawersContext,
  VariantKey,
} from './drawers';

type EnterType = NavigationType;
type ExitType = Exclude<NavigationType, 'load'>;

export interface ScreenContextData {
  id: ScreenId;
  enterType: EnterType;
  exitType: ExitType;
  entering: boolean;
  exiting: boolean;
}

const ScreenContext = createContext({} as ScreenContextData);

export interface ScreenProviderProps {
  pathname: string;
  children?: ReactNode;
}

export const ScreenProvider = ({ pathname, children }: ScreenProviderProps) => {
  const id = useRef(getScreenFromPathname(pathname)).current;
  const enterType = useRef<EnterType>('load');
  const exitType = useRef<ExitType>('forward');

  const { screens, setScreens, currentScreen, navigationType } =
    useDrawersContext();

  const { entering = false, exiting = false } = screens[id] || {};

  useSyncEffect(() => {
    if (currentScreen === id) {
      enterType.current = navigationType;
    } else {
      exitType.current = navigationType as ExitType;
    }
  }, [currentScreen, navigationType]);

  const onAnimationComplete = (variant: VariantKey) => {
    const [navigation, animation] = variant.split('-') as [
      NavigationType,
      AnimationType
    ];

    if (navigation === navigationType && animation === 'exit') {
      setScreens(prev => ({
        ...prev,
        [id]: {
          entering: false,
          exiting: false,
        },
        [currentScreen]: {
          entering: false,
          exiting: false,
        },
      }));
    }
  };

  const animationStates = {
    initial: [`${enterType.current}-initial`],
    animate: [`${enterType.current}-animate`],
    exit: [`${exitType.current}-exit`],
  };

  return (
    <ScreenContext.Provider
      value={{
        id,
        entering,
        exiting,
        enterType: enterType.current,
        exitType: exitType.current,
      }}
    >
      <motion.div
        className="contents"
        {...animationStates}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.div>
    </ScreenContext.Provider>
  );
};

export const useScreenContext = () => useContext(ScreenContext);
