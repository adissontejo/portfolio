import { useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId } from '~/data';
import { AnimationVariants } from '~/types';

import { Container, ContainerProps } from './styles';

export type BackButtonProps = ContainerProps & {
  id: DrawerId;
};

export const BackButton = ({ id, color }: BackButtonProps) => {
  const { transitioning, closeDrawer } = useDrawersContext();

  const [hover, setHover] = useState(false);
  const [closing, setClosing] = useState(false);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave' | 'onClick'>(null);

  const onMouseEnter = () => {
    if (closing) {
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
    if (closing) {
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
    if (closing) {
      return;
    }

    if (transitioning) {
      actionQueue.current = 'onClick';

      return;
    }

    setClosing(true);

    setHover(true);

    setTimeout(() => {
      closeDrawer(id);
    }, 200);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = {
      onMouseEnter,
      onMouseLeave,
      onClick,
    };

    actions[actionQueue.current]();

    actionQueue.current = null;
  }, [transitioning]);

  const containerVariants: AnimationVariants = {
    enterInitial: {
      x: '-101%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.8,
      },
    },
    loadAnimate: {
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
    backExit: {
      x: '-101%',
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <Container color={color} variants={containerVariants}>
      <motion.button
        className="button"
        animate={{ x: hover ? -5 : -20 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div className="label-wrapper">
          <p className="label">voltar</p>
          <MdOutlineArrowBackIosNew className="icon" />
        </div>
      </motion.button>
    </Container>
  );
};
