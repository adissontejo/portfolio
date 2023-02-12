import { useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type BackButtonProps = {
  id: DrawerId;
};

export const BackButton = ({ id }: BackButtonProps) => {
  const {
    transitioning,
    prevScreen,
    currentScreen,
    screenHistory,
    closeDrawer,
  } = useDrawersContext();

  const [hover, setHover] = useState(false);
  const [closing, setClosing] = useState(false);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave' | 'onClick'>(null);

  const backColor = useMemo(() => {
    const backScreen = screenHistory[screenHistory.length - 2];

    return backScreen === 'home' ? 'background' : drawers[backScreen].color;
  }, []);

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
      width: 0,
    },
    animate: {
      width: 'auto',
      transition: {
        duration: 0.7,
        delay: prevScreen === 'home' ? 0.8 : 0,
      },
    },
    loadAnimate: {
      width: 'auto',
      transition: {
        duration: 0.7,
      },
    },
    backExit: {
      width: 0,
      transition: {
        duration: 0.7,
        delay: currentScreen === 'home' ? 0 : 0.8,
      },
    },
  };

  return (
    <Container
      color={drawers[id].color}
      background={backColor}
      variants={containerVariants}
      animate={{ x: hover ? 15 : 0 }}
    >
      <button
        className="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <p className="label">voltar</p>
        <MdOutlineArrowBackIosNew className="icon" />
      </button>
    </Container>
  );
};
