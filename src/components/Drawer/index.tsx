import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { theme } from '~/styles';
import { AnimationVariants } from '~/types';

export interface DrawerProps {
  id: DrawerId;
  opening: boolean;
  setOpening: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const Drawer = ({
  id,
  className = '',
  opening,
  setOpening,
}: DrawerProps) => {
  const { color, label, rightToLeftPosition } = drawers[id];

  const { activeDrawer, columnWidth, transitioning, openDrawer } =
    useDrawersContext();

  const [hover, setHover] = useState(false);

  const actionQueue = useRef<'onClick' | 'onMouseEnter' | 'onMouseLeave'>(null);

  const onMouseEnter = () => {
    if (opening) {
      return;
    }

    if (transitioning) {
      if (actionQueue.current !== 'onClick') {
        actionQueue.current = 'onMouseEnter';
      }

      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (opening) {
      return;
    }

    if (transitioning) {
      if (actionQueue.current !== 'onClick') {
        actionQueue.current = 'onMouseLeave';
      }

      return;
    }

    setHover(false);
  };

  const onClick = () => {
    if (opening) {
      return;
    }

    if (transitioning) {
      actionQueue.current = 'onClick';

      return;
    }

    setOpening(true);

    setHover(true);

    setTimeout(() => {
      openDrawer(id);
    }, 200);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = {
      onClick,
      onMouseEnter,
      onMouseLeave,
    };

    actions[actionQueue.current]();

    actionQueue.current = null;
  }, [transitioning]);

  const containerVariants: AnimationVariants = {
    loadInitial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 2,
        when: 'afterChildren',
      },
    },
  };

  const slideVariants: AnimationVariants = {
    forwardExit: {
      x:
        activeDrawer === id
          ? `calc(-100vw + ${(rightToLeftPosition + 1) * columnWidth}px)`
          : '100vw',
      transition: {
        duration: activeDrawer === id ? 1.5 : 1,
      },
    },
    backInitial: {
      x:
        activeDrawer === id
          ? `calc(-100vw + ${(rightToLeftPosition + 1) * columnWidth}px)`
          : '100vw',
    },
    backAnimate: {
      x: 0,
      transition: {
        duration: activeDrawer === id ? 1.5 : 1,
      },
    },
  };

  const columnVariants: AnimationVariants = {
    loadInitial: {
      height: 0,
    },
    animate: {
      height: '100vh',
      transition: {
        duration: 1,
        delay: 0.5 + rightToLeftPosition * 0.2,
      },
    },
  };

  return (
    <motion.div
      className={`${className} relative flex w-full cursor-pointer justify-end self-end lg:self-center lg:justify-self-end`}
      style={{ zIndex: (2 - rightToLeftPosition) * 10 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={containerVariants}
    >
      <motion.div
        className={`h-[35px] w-full overflow-hidden pl-[30px] sm:h-[50px]`}
        variants={slideVariants}
      >
        <motion.div
          className="flex h-full w-full items-center"
          style={{ backgroundColor: theme.colors[color] as string }}
          animate={{ x: hover ? -15 : 0 }}
        >
          <div className="flex items-center gap-4 lg:flex-row-reverse lg:justify-end">
            <img
              className="h-18 ml-4 sm:h-auto lg:ml-0"
              src={`/drawer-icons/${id}.svg`}
              alt={label}
            />
            <p className="text-light lg:ml-8 lg:text-xl">{label}</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 h-full w-[40px] sm:w-[80px]"
        style={{
          backgroundColor: theme.colors[color] as string,
          right: rightToLeftPosition * columnWidth - 20,
        }}
        variants={columnVariants}
        animate={{ x: hover ? -15 : 0 }}
      />
    </motion.div>
  );
};
