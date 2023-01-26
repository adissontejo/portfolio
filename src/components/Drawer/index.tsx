import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type DrawerProps = {
  id: DrawerId;
  opening: boolean;
  setOpening: Dispatch<SetStateAction<boolean>>;
};

export const Drawer = ({ id, opening, setOpening }: DrawerProps) => {
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

  const barVariants: AnimationVariants = {
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
    <Container
      gridArea={id}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={containerVariants}
    >
      <m.div
        className="bar"
        variants={slideVariants}
        animate={{ x: hover ? -15 : 0 }}
      >
        <div className="label-wrapper">
          <p className="label">{label}</p>
          <img className="icon" src={`/drawer-icons/${id}.svg`} alt={label} />
        </div>
      </m.div>
      <m.div
        className="column"
        variants={{ ...slideVariants, ...barVariants }}
        animate={{ x: hover ? -15 : 0 }}
      />
    </Container>
  );
};
