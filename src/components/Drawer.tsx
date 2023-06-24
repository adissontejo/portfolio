import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useDrawersContext, useScreenContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { getColumnLeftPos } from '~/lib';

export interface DrawerProps {
  id: DrawerId;
  className?: string;
}

export const Drawer = ({ id, className = '' }: DrawerProps) => {
  const { color, label, rightToLeftPosition } = drawers[id];

  const columnLeftPos = getColumnLeftPos(id);

  const router = useRouter();

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave' | 'onClick'>(null);

  const { activeDrawer, setActiveDrawer, prevScreen, currentScreen, variants } =
    useDrawersContext();

  const { entering, exiting } = useScreenContext();

  const hover = activeDrawer === id;

  const slideXWithoutHover = `calc(-1 * ${columnLeftPos})`;
  const slideXWithHover = `calc(${slideXWithoutHover} + 15px)`;
  const slideX = hover ? slideXWithHover : slideXWithoutHover;

  const onMouseEnter = () => {
    if (exiting || actionQueue.current === 'onClick') {
      return;
    }

    if (entering) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setActiveDrawer(id);
  };

  const onMouseLeave = () => {
    if (exiting || actionQueue.current === 'onClick') {
      return;
    }

    if (entering) {
      actionQueue.current = 'onMouseLeave';

      return;
    }

    setActiveDrawer(prev => (prev === id ? null : prev));
  };

  const onClick = () => {
    if (exiting) {
      return;
    }

    if (entering && prevScreen !== id) {
      actionQueue.current = 'onClick';

      return;
    }

    router.push(`/${id}`);
  };

  useEffect(() => {
    if (entering || exiting || actionQueue.current === null) {
      return;
    }

    const actions = { onMouseEnter, onMouseLeave, onClick };

    actions[actionQueue.current]();

    actionQueue.current = null;
  }, [entering, exiting]);

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
      style={{ zIndex: (2 - rightToLeftPosition) * 10 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="h-[35px] w-full overflow-hidden pl-[30px] sm:h-[50px]"
        variants={barVariants}
      >
        <motion.div
          className="flex h-full w-full items-center gap-4 lg:flex-row-reverse lg:justify-end"
          style={{ backgroundColor: `var(--${color}-color)` }}
          animate={{ x: hover ? -15 : 0 }}
        >
          <img
            className="h-18 ml-4 sm:h-auto lg:ml-0"
            src={`/drawer-icons/${id}.svg`}
            alt={label}
          />
          <p className="text-light sm:text-xl lg:ml-8">{label}</p>
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
