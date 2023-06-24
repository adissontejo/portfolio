import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, Target, TargetAndTransition } from 'framer-motion';

import { DrawerId } from '~/data';
import { useSyncEffect } from '~/hooks';
import { getScreenFromPathname } from '~/lib';

type ScreenId = DrawerId | 'home';

type NavigationType = 'load' | 'back' | 'forward';

type NavigationState = NavigationType | 'enter';

type AnimationType = 'initial' | 'animate' | 'exit';

type VariantKey = `${NavigationType}-${AnimationType}`;

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
  activeDrawer: DrawerId;
  setActiveDrawer: Dispatch<SetStateAction<DrawerId>>;
  transitioning: boolean;
  prevScreen: ScreenId;
  currentScreen: ScreenId;
  screenHistory: ScreenId[];
  animationType: 'load' | 'back' | 'forward';
  navigationType: NavigationType;
  variants: (config: VariantsFunctionProps) => AnimationVariants;
}

export const DrawersContext = createContext({} as DrawersContextType);

export const DrawersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [activeDrawer, setActiveDrawer] = useState<DrawerId>(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigationType = useRef<NavigationType>('load');
  const prevScreen = useRef<ScreenId>(null);
  const currentScreen = useRef<ScreenId>(
    getScreenFromPathname(router.pathname)
  );
  const screenHistory = useRef<ScreenId[]>([currentScreen.current]);
  const maskedBack = useRef(currentScreen.current !== 'home');

  const variants = (config: VariantsFunctionProps): AnimationVariants => {
    const animationVariants: AnimationVariants = {};

    const navigationTypes: NavigationState[] = ['load', 'back', 'forward'];
    const animationTypes: AnimationType[] = ['initial', 'animate', 'exit'];

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

      // Remove animate and exit from variants if back navigation is masked
      if (maskedBack.current) {
        const canAnimateLoad = prevScreen.current !== null;

        if (navigation !== 'load' || !canAnimateLoad) {
          animationVariants[`${navigation}-animate`] = {};
        }

        animationVariants[`${navigation}-exit`] = {};
      }
    });

    if (maskedBack.current) {
      // Ensure that the screen stays visible if the back navigation is masked
      animationVariants['back-exit'] = {
        x: 0,
        transition: {
          duration: 1.5,
        },
      };
    }

    return animationVariants;
  };

  const onRouteChangeStart = useCallback(
    (pathname: string) => {
      setTransitioning(true);

      const screen = getScreenFromPathname(pathname);

      if (screen === currentScreen.current) {
        return;
      }

      currentScreen.current = screen;

      if (maskedBack.current) {
        // if back navigation is masked and screen is on home
        if (screen === 'home') {
          navigationType.current = 'back';

          screenHistory.current = ['home'];
        } // if back navigation is masked and screen is back to the drawer
        else {
          navigationType.current = 'load';

          prevScreen.current = 'home';

          screenHistory.current.push(screen);
        }
      } else if (screenHistory.current.includes(screen)) {
        navigationType.current = 'back';

        prevScreen.current = screenHistory.current.pop();
      } else {
        navigationType.current = 'forward';

        prevScreen.current =
          screenHistory.current[screenHistory.current.length - 1];

        screenHistory.current.push(screen);
      }
    },
    [screenHistory.current, currentScreen.current, maskedBack.current]
  );

  useSyncEffect(() => {
    if (maskedBack.current && !transitioning && prevScreen.current !== null) {
      maskedBack.current = false;
    }
  }, [transitioning]);

  useEffect(() => {
    if (currentScreen.current !== 'home' && prevScreen.current === null) {
      const { pathname } = router;

      maskedBack.current = true;

      setTimeout(() => {
        router.replace('/').then(() => {
          setTimeout(() => {
            router.push(pathname);
          }, 10);
        });
      }, 10);
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => router.events.off('routeChangeStart', onRouteChangeStart);
  }, [onRouteChangeStart]);

  useEffect(() => {
    if (!transitioning && currentScreen.current !== 'home') {
      setActiveDrawer(null);
    }
  }, [transitioning]);

  return (
    <DrawersContext.Provider
      value={{
        activeDrawer,
        setActiveDrawer,
        transitioning,
        animationType: navigationType.current,
        navigationType: navigationType.current,
        prevScreen: prevScreen.current,
        currentScreen: currentScreen.current,
        screenHistory: screenHistory.current,
        variants,
      }}
    >
      <AnimatePresence onExitComplete={() => setTransitioning(false)}>
        {children}
      </AnimatePresence>
    </DrawersContext.Provider>
  );
};

export const useDrawersContext = () => useContext(DrawersContext);
