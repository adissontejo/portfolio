import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { DrawerId, drawers } from '~/data';
import { useDrawersContext } from '~/contexts';
import { useInViewAnimation } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type NextButtonProps = {
  id: DrawerId;
};

export const NextButtton = ({ id }: NextButtonProps) => {
  const { transitioning, prevScreen, currentScreen, openDrawer } =
    useDrawersContext();

  const inViewProps = useInViewAnimation<HTMLDivElement>({ minAmount: 1 });

  const [hover, setHover] = useState(false);
  const [opening, setOpening] = useState(false);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave' | 'onClick'>(null);

  const onMouseEnter = () => {
    if (opening || transitioning) {
      if (actionQueue.current !== 'onClick') {
        actionQueue.current = 'onMouseEnter';
      }

      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (opening || transitioning) {
      if (actionQueue.current !== 'onClick') {
        actionQueue.current = 'onMouseLeave';
      }

      return;
    }

    setHover(false);
  };

  const onClick = () => {
    if (opening || transitioning) {
      actionQueue.current = 'onClick';

      return;
    }

    setHover(true);
    setOpening(true);

    setTimeout(() => {
      openDrawer(id);
    }, 200);
  };

  useEffect(() => {
    if (opening || transitioning || actionQueue.current === null) {
      return;
    }

    const actions = {
      onMouseEnter,
      onMouseLeave,
      onClick,
    };

    actions[actionQueue.current]();
  }, [opening, transitioning]);

  const containerVariants: AnimationVariants = {
    loadInitial: {
      width: 0,
    },
    whileInView: {
      width: 'auto',
      transition: {
        duration: 0.7,
      },
    },
    backInitial: {
      x: '-100vw',
    },
    backAnimate: prevScreen === id && {
      x: 0,
      transition: {
        duration: 1.5,
      },
    },
    forwardExit: currentScreen === id && {
      x: '-100vw',
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <Container color={drawers[id].color} {...inViewProps}>
      <motion.div
        className="wrapper"
        variants={containerVariants}
        animate={{ x: hover ? -15 : 0 }}
      >
        <button
          className="button"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <img
            className="icon"
            src={`/drawer-icons/${id}.svg`}
            alt={drawers[id].label}
          />
          <p className="label">{drawers[id].label}</p>
        </button>
      </motion.div>
    </Container>
  );
};
