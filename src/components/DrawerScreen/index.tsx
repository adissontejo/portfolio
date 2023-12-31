import { ReactNode, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId } from '~/data';
import { useDrawer, useLoopAnimation, useSyncEffect } from '~/hooks';
import { getColumnLeftPos } from '~/lib';

import { BackButton } from './BackButton';
import { NextDrawerButton } from './NextDrawerButton';
import { ScrollUpButton } from './ScrollUpButton';

export interface DrawerScreenProps {
  children?: ReactNode;
}

export const DrawerScreen = ({ children }: DrawerScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    activeDrawer,
    screenHistory,
    navigationType,
    prevScreen,
    currentScreen,
    variants,
  } = useDrawersContext();

  const { id, color, title, rightToLeftPosition } = useDrawer();

  const slideXWithoutHover = getColumnLeftPos(id);
  const slideXWithHover = `calc(${slideXWithoutHover} - 15px)`;
  const slideX = activeDrawer === id ? slideXWithHover : slideXWithoutHover;

  const leftingDrawers = useSyncEffect(() => {
    const drawers: DrawerId[] = ['experiences', 'qualifications', 'contact'];

    return drawers.filter(drawer => !screenHistory.includes(drawer));
  }, []);

  const zIndex = useMemo(() => {
    const leftScreen =
      navigationType === 'forward' ? prevScreen : currentScreen;

    if (leftScreen === 'home' || leftScreen === id) {
      return (3 - rightToLeftPosition) * 10 + 5;
    }

    if (leftScreen === id) {
      return 0;
    }

    return 100;
  }, [navigationType, prevScreen, currentScreen]);

  useEffect(() => {
    if (navigationType === 'back') {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
    }
  }, []);

  const titleAnimation = useLoopAnimation({
    from: {
      y: 0,
    },
    to: {
      y: 20,
    },
    transition: {
      ease: 'easeInOut',
      duration: 10,
      initialDelay: navigationType === 'forward' ? 1.5 : 0,
    },
  });

  const containerVariants = variants({
    forward: {
      initial: {
        x: prevScreen === 'home' ? slideX : '100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: 1.5,
        },
      },
    },

    back: {
      exit: {
        x: currentScreen === 'home' ? slideX : '100vw',
        transition: {
          duration: 1.5,
        },
      },
    },
  });

  const titleVariants = variants({
    default: {
      y: 0,
      opacity: 1,
    },

    enter: {
      initial: {
        y: -30,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      },
    },

    forward: {
      animate: {
        transition: {
          duration: 1,
          delay: 0.5,
        },
      },
    },

    back: {
      exit: {
        y: -30,
        opacity: 0,
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <motion.div
      className="fixed left-0 top-0 flex h-full w-full flex-col items-center overflow-hidden"
      style={{ backgroundColor: `var(--${color}-color)`, zIndex }}
      variants={containerVariants}
    >
      <Head>
        <title>Ádisson · {title}</title>
      </Head>
      <main
        ref={containerRef}
        className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden"
      >
        <header className="flex w-full flex-col">
          <BackButton />
          <motion.div
            className="flex w-full justify-center px-5 pb-5 pt-14 sm:justify-start sm:pl-20"
            variants={titleVariants}
          >
            <motion.img
              className="max-w-full"
              src={`/drawer-titles/${id}.svg`}
              alt={title}
              draggable={false}
              {...titleAnimation}
            />
          </motion.div>
        </header>
        {children}
        <footer className="mt-16 flex min-h-[140px] w-full flex-col items-end sm:min-h-[200px]">
          {leftingDrawers.map(drawer => (
            <NextDrawerButton
              key={drawer}
              className="mb-[35px] sm:mb-[50px]"
              drawerId={drawer}
            />
          ))}
        </footer>
      </main>
      <ScrollUpButton containerRef={containerRef} />
    </motion.div>
  );
};
