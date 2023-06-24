import { ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { useLoopAnimation } from '~/hooks';
import { getColumnLeftPos } from '~/lib';

import { BackButton } from './BackButton';

export interface DrawerScreenProps {
  id: DrawerId;
  children?: ReactNode;
}

export const DrawerScreen = ({ id, children }: DrawerScreenProps) => {
  const { color, title, rightToLeftPosition } = drawers[id];

  const { activeDrawer, navigationType, prevScreen, currentScreen, variants } =
    useDrawersContext();

  const slideXWithoutHover = getColumnLeftPos(id);
  const slideXWithHover = `calc(${slideXWithoutHover} - 15px)`;
  const slideX = activeDrawer === id ? slideXWithHover : slideXWithoutHover;

  const zIndex = useMemo(() => {
    const leftScreen =
      navigationType === 'forward' ? prevScreen : currentScreen;

    if (leftScreen === 'home' || leftScreen === id) {
      return (2 - rightToLeftPosition) * 10 + 5;
    }

    return 30;
  }, [navigationType, prevScreen, currentScreen]);

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
      exit: {
        x: '-100vw',
        transition: {
          duration: 1.5,
        },
      },
    },

    back: {
      initial: {
        x: '-100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: 1.5,
        },
      },
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
      className="fixed left-0 top-0 flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: `var(--${color}-color)`, zIndex }}
      variants={containerVariants}
    >
      <BackButton drawerId={id} />
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
    </motion.div>
  );
};
