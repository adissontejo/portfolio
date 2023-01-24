import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';

import { Container } from './styles';

export type DrawerProps = {
  id: DrawerId;
  opening: boolean;
  setOpening: Dispatch<SetStateAction<boolean>>;
};

export const Drawer = ({ id, opening, setOpening }: DrawerProps) => {
  const { color, label, rightToLeftPosition } = drawers[id];

  const {
    activeDrawer,
    columnWidth,
    animationType,
    transitioning,
    openDrawer,
  } = useDrawersContext();

  const [hover, setHover] = useState(false);

  const actionQueue = useRef<'onClick' | 'onMouseEnter' | 'onMouseLeave'>(null);

  const x = `calc(-100vw + ${(rightToLeftPosition + 1) * columnWidth}px)`;

  const initial = animationType === 'back' && {
    x: activeDrawer === id ? x : '100vw',
  };

  const animate = {
    x: hover ? -15 : 0,
    transition: {
      x: {
        duration: !transitioning ? 0.2 : activeDrawer === id ? 1.5 : 1,
      },
      height: { duration: 1, delay: 0.5 + rightToLeftPosition * 0.2 },
    },
  };

  const exit = {
    x: activeDrawer === id ? x : '100vw',
    transition: {
      duration: activeDrawer === id ? 1.5 : 1,
      times: [0, 0.2, 1],
    },
  };

  const onMouseEnter = () => {
    if (opening) {
      return;
    }

    if (transitioning) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (opening) {
      return;
    }

    if (transitioning) {
      actionQueue.current = 'onMouseLeave';

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

  return (
    <Container
      gridArea={id}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      onClick={onClick}
      initial={animationType === 'load' ? { width: 0 } : false}
      animate={{
        width: '100%',
        transition: { duration: 2, delay: 1.5 + rightToLeftPosition * 0.2 },
      }}
      hover={false}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="bar"
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <div className="label-wrapper">
          <p className="label">{label}</p>
          <img className="icon" src={`/drawer-icons/${id}.svg`} alt={label} />
        </div>
      </motion.div>
      <motion.div
        className="column"
        initial={animationType === 'load' ? { height: 0 } : initial}
        animate={{ height: '100vh', ...animate }}
        exit={exit}
      />
    </Container>
  );
};
