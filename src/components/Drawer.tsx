import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { getColumnLeftPos } from '~/lib';

export interface DrawerProps {
  id: DrawerId;
  className?: string;
}

export const Drawer = ({ id, className = '' }: DrawerProps) => {
  const { color, label, rightToLeftPosition } = drawers[id];

  const columnLeftPos = getColumnLeftPos(id);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave'>(null);

  const {
    transitioning,
    activeDrawer,
    setActiveDrawer,
    prevScreen,
    currentScreen,
    openDrawer,
    variants,
  } = useDrawersContext();

  const hover = activeDrawer === id;

  const slideXWithoutHover = `calc(-1 * ${columnLeftPos})`;
  const slideXWithHover = `calc(${slideXWithoutHover} + 15px)`;
  const slideX = hover ? slideXWithHover : slideXWithoutHover;

  const onMouseEnter = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setActiveDrawer(id);
  };

  const onMouseLeave = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseLeave';

      return;
    }

    setActiveDrawer(prev => (prev === id ? null : prev));
  };

  const onClick = () => {
    openDrawer(id);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = { onMouseEnter, onMouseLeave };

    actions[actionQueue.current]();

    actionQueue.current = null;
  }, [transitioning]);

  const barVariants = variants({
    default: {
      x: 0,
      width: '100%',
    },

    load: {
      initial: {
        width: 0,
      },
      animate: {
        width: '100%',
        transition: {
          duration: 2,
          delay: 1.5 + rightToLeftPosition * 0.2,
        },
      },
    },

    forward: {
      exit: {
        x: currentScreen === id ? slideX : '100vw',
        transition: {
          duration: currentScreen === id ? 1.5 : 1,
        },
      },
    },

    back: {
      initial: {
        x: prevScreen === id ? slideX : '100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: prevScreen === id ? 1.5 : 1,
        },
      },
    },
  });

  const columnVariants = variants({
    default: {
      x: 0,
      height: '100%',
    },

    load: {
      initial: {
        height: 0,
      },
      animate: {
        height: '100%',
        transition: {
          duration: 1,
          delay: 0.5 + rightToLeftPosition * 0.2,
        },
      },
    },

    forward: {
      exit: {
        x: '100vw',
        transition: {
          duration: 1,
        },
      },
    },

    back: {
      initial: {
        x: '100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <button
      className={`${className} relative flex w-full cursor-pointer justify-end self-end lg:self-center lg:justify-self-end`}
      style={{ zIndex: (3 - rightToLeftPosition) * 10 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="h-[35px] w-full overflow-hidden pl-5 sm:h-[50px]"
        variants={barVariants}
      >
        <motion.div
          className="flex h-full w-full items-center gap-4 text-light lg:flex-row-reverse lg:justify-end"
          style={{ backgroundColor: `var(--${color}-color)` }}
          animate={{ x: hover ? -15 : 0 }}
        >
          <img
            className="ml-4 aspect-square h-[18px] sm:h-[21px] lg:ml-0"
            src={`/drawer-icons/${id}.svg`}
            alt={label}
          />
          <p className="sm:text-xl lg:ml-8">{label}</p>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 h-full w-screen"
        style={{ left: columnLeftPos }}
        variants={columnVariants}
      >
        <motion.div
          className="h-full w-full"
          style={{ backgroundColor: `var(--${color}-color)` }}
          animate={{ x: hover ? -15 : 0 }}
        />
      </motion.div>
    </button>
  );
};
