import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';

export interface NextDrawerButtonProps {
  drawerId: DrawerId;
  className?: string;
}

export const NextDrawerButton = ({
  drawerId,
  className = '',
}: NextDrawerButtonProps) => {
  const {
    transitioning,
    activeDrawer,
    setActiveDrawer,
    prevScreen,
    currentScreen,
    openDrawer,
    variants,
  } = useDrawersContext();

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave' | 'onClick'>(null);

  const { color, label } = drawers[drawerId];

  const hover = activeDrawer === drawerId;

  const onMouseEnter = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setActiveDrawer(drawerId);
  };

  const onMouseLeave = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseLeave';

      return;
    }

    setActiveDrawer(prev => (prev === drawerId ? null : prev));
  };

  const onClick = () => {
    openDrawer(drawerId);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = { onMouseEnter, onMouseLeave };

    actions[actionQueue.current]();

    actionQueue.current = null;
  }, [transitioning]);

  const containerVariants = variants({
    default: {
      x: 0,
    },

    forward: {
      exit: {
        x: currentScreen === drawerId ? '-100vw' : '100vw',
        transition: {
          duration: 1.5,
        },
      },
    },

    back: {
      initial: {
        x: prevScreen === drawerId ? '-100vw' : '100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: 1.5,
        },
      },
    },
  });

  return (
    <motion.div
      className={`${className} relative z-50 w-4/5 max-w-lg`}
      variants={containerVariants}
    >
      <motion.button
        className="relative left-20 flex h-[35px] w-full items-center gap-4 text-light sm:h-[50px]"
        style={{ backgroundColor: `var(--${color}-color)` }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        animate={{ x: hover ? -15 : 0 }}
      >
        <img
          className="height-[18px] sm:height-[21px] ml-4 aspect-square"
          src={`/drawer-icons/${drawerId}.svg`}
          alt={label}
        />
        <p className="sm:text-lg">{label}</p>
      </motion.button>
    </motion.div>
  );
};
