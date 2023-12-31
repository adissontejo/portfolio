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
import { AnimatePresence, Target, TargetAndTransition } from 'framer-motion';

import { DrawerId } from '~/data';
import { getScreenFromPathname } from '~/lib';

type ScreenId = DrawerId | 'home';

export type NavigationType = 'load' | 'back' | 'forward';

type NavigationState = NavigationType | 'enter';

export type AnimationType = 'initial' | 'animate' | 'exit' | 'whileInView';

export type VariantKey = `${NavigationType}-${AnimationType}`;

type AnimationProps = Partial<
  Record<AnimationType, TargetAndTransition> & {
    initial?: Target;
  }
>;

type AnimationVariants = Partial<
  Record<VariantKey, TargetAndTransition> & {
    [Property in `${NavigationType}-initial`]: Target;
  }
>;

type VariantsFunctionProps = Partial<
  Record<NavigationState, AnimationProps> & {
    default: Target;
  }
>;

export interface DrawersContextType {
  transitioning: boolean;
  activeDrawer: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  prevScreen: ScreenId;
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  animationType: 'load' | 'back' | 'forward';
  navigationType: NavigationType;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: () => void;
  variants: (config: VariantsFunctionProps) => AnimationVariants;
}

export const DrawersContext = createContext<DrawersContextType>(null);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [transitioning, setTransitioning] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerId>(null);

  const navigationType = useRef<NavigationType>('load');
  const prevScreen = useRef<ScreenId>(null);
  const currentScreen = useRef<ScreenId>(
    getScreenFromPathname(router.pathname)
  );
  const screenHistory = useRef<ScreenId[]>(
    currentScreen.current === 'home'
      ? ['home']
      : ['home', currentScreen.current]
  );
  const actionQueue = useRef<['openDrawer', DrawerId] | 'closeDrawer'>(null);

  const variants = (config: VariantsFunctionProps): AnimationVariants => {
    const animationVariants: AnimationVariants = {};

    const navigationTypes: NavigationState[] = ['load', 'back', 'forward'];
    const animationTypes: AnimationType[] = [
      'initial',
      'animate',
      'exit',
      'whileInView',
    ];

    navigationTypes.forEach(navigation => {
      const navigationConfig = config[navigation] || {};
      const enterConfig = config.enter || {};

      animationTypes.forEach(animation => {
        const target = {
          ...config.default,
          ...(navigation !== 'back' ? enterConfig[animation] : {}),
          ...navigationConfig[animation],
        } as Target;

        animationVariants[`${navigation}-${animation}`] = target;
      });
    });

    return animationVariants;
  };

  const openDrawer = (id: DrawerId) => {
    if (id === currentScreen.current) {
      return;
    }

    if (
      transitioning &&
      (navigationType.current !== 'back' || id !== prevScreen.current)
    ) {
      actionQueue.current = ['openDrawer', id];

      return;
    }

    const open = () => {
      prevScreen.current =
        screenHistory.current[screenHistory.current.length - 1];

      currentScreen.current = id;

      navigationType.current = 'forward';

      screenHistory.current.push(id);

      router.replace(`/${id}`);

      setTransitioning(true);
    };

    if (!transitioning) {
      setTimeout(open, 200);
    } else {
      open();
    }
  };

  const closeDrawer = () => {
    if (currentScreen.current === 'home') {
      return;
    }

    if (transitioning && navigationType.current !== 'forward') {
      actionQueue.current = 'closeDrawer';

      return;
    }

    const close = () => {
      prevScreen.current = currentScreen.current;

      currentScreen.current =
        screenHistory.current[screenHistory.current.length - 2] || 'home';

      navigationType.current = 'back';

      screenHistory.current.pop();

      router.replace(
        `/${currentScreen.current === 'home' ? '' : currentScreen.current}`,
        undefined,
        {
          scroll: false,
        }
      );

      setTransitioning(true);
    };

    if (!transitioning) {
      setTimeout(close, 200);
    } else {
      close();
    }
  };

  const onExitComplete = () => {
    setActiveDrawer(null);

    setTransitioning(false);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    if (actionQueue.current === 'closeDrawer') {
      closeDrawer();
    } else if (
      typeof actionQueue.current === 'object' &&
      actionQueue.current[0] === 'openDrawer'
    ) {
      openDrawer(actionQueue.current[1]);
    }

    actionQueue.current = null;
  }, [transitioning]);

  return (
    <DrawersContext.Provider
      value={{
        transitioning,
        activeDrawer,
        setActiveDrawer,
        animationType: navigationType.current,
        navigationType: navigationType.current,
        prevScreen: prevScreen.current,
        currentScreen: currentScreen.current,
        screenHistory: screenHistory.current,
        openDrawer,
        closeDrawer,
        variants,
      }}
    >
      <AnimatePresence onExitComplete={onExitComplete}>
        {children}
      </AnimatePresence>
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => {
  const context = useContext(DrawersContext);

  if (context === null) {
    throw new Error('Must be used with DrawersProvider');
  }

  return context;
};
