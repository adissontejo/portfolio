import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { drawers } from '~/data';
import { useDrawer, useSyncEffect } from '~/hooks';

export interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className = '' }: BackButtonProps) => {
  const [hover, setHover] = useState(false);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave'>(null);

  const {
    transitioning,
    screenHistory,
    prevScreen,
    currentScreen,
    closeDrawer,
    variants,
  } = useDrawersContext();

  const { id, color } = useDrawer();

  const backScreen = useSyncEffect(() => {
    return screenHistory[screenHistory.length - 2] || null;
  }, []);

  const containerStyle = useSyncEffect(() => {
    if (backScreen === null || backScreen === 'home') {
      return { color: `var(--${color}-color)` };
    }

    return {};
  }, []);

  const buttonStyle = useSyncEffect(() => {
    if (backScreen !== null && backScreen !== 'home') {
      const { color: prevColor } = drawers[backScreen];

      return {
        color: 'var(--light-color)',
        backgroundColor: `var(--${prevColor}-color)`,
      };
    }
  }, []);

  const onClick = () => {
    if (currentScreen !== id) {
      return;
    }

    closeDrawer();
  };

  const onMouseEnter = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseLeave';

      return;
    }

    setHover(false);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = { onMouseEnter, onMouseLeave };

    actions[actionQueue.current]();
  }, [transitioning]);

  const buttonVariants = variants({
    default: {
      x: 0,
      perspective: 1,
    },

    enter: {
      initial: {
        x: '-100%',
      },
      animate: {
        x: 0,
        transition: {
          duration: 0.7,
          delay: prevScreen === 'home' ? 0.8 : 0,
        },
      },
    },

    load: {
      animate: {
        x: 0,
        transition: {
          duration: 0.7,
          delay: 0.5,
        },
      },
    },

    back: {
      exit: {
        x: '-100%',
        transition: {
          duration: 0.7,
          delay: currentScreen === 'home' ? 0 : 0.8,
        },
      },
    },
  });

  return (
    <motion.div
      className={`relative z-10 ${className} w-4/5 max-w-lg pt-14`}
      style={containerStyle}
      variants={buttonVariants}
    >
      <motion.button
        className="relative -left-5 flex h-[35px] w-full items-center justify-end gap-4 bg-light transition-dark-mode dark:bg-dark dark:text-light sm:h-[50px]"
        style={buttonStyle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        animate={{ x: hover ? 15 : 0 }}
      >
        <p className="sm:text-lg">voltar</p>
        <MdOutlineArrowBackIosNew className="mr-8 text-[18px] sm:text-[21px]" />
      </motion.button>
    </motion.div>
  );
};
