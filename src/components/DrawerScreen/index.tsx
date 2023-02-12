import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { drawers } from '~/data';
import { AnimationVariants, Drawers } from '~/types';

import { Container } from './styles';
import { BackButton } from './BackButton';
import { BottomButtons } from './BottomButtons';

export type DrawerScreenProps = {
  id: Drawers;
  children?: ReactNode;
  className?: string;
};

export const DrawerScreen = ({
  id,
  children,
  className,
}: DrawerScreenProps) => {
  const { color, title, rightToLeftPosition } = drawers[id];

  const {
    columnWidth,
    animationType,
    prevScreen,
    currentScreen,
    animationStates,
  } = useDrawersContext();

  const containerRef = useRef<HTMLDivElement>();

  const zIndex = useMemo(() => {
    if (animationType === 'forward') {
      if (prevScreen === 'home') {
        return (2 - rightToLeftPosition) * 10 + 5;
      }

      if (prevScreen === id) {
        return 0;
      }

      return 100;
    }

    if (currentScreen === 'home') {
      return (2 - rightToLeftPosition) * 10 + 5;
    }

    if (currentScreen === id) {
      return 0;
    }

    return 100;
  }, [prevScreen, currentScreen, animationType]);

  useEffect(() => {
    if (animationType === 'back') {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
    }
  }, []);

  const containerVariants: AnimationVariants = {
    forwardInitial: {
      x:
        prevScreen === 'home'
          ? `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth + 15}px)`
          : '100vw',
    },
    animate: {
      x: 0,
      transition: {
        duration: 1.5,
      },
    },
    backExit: {
      x:
        currentScreen === 'home'
          ? `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth}px)`
          : '100vw',
      transition: {
        duration: 1.5,
      },
    },
  };

  const titleVariants: AnimationVariants = {
    enterInitial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
    loadAnimate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    backExit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container
      ref={containerRef}
      className={className}
      color={color}
      zIndex={zIndex}
      variants={containerVariants}
      {...animationStates}
    >
      <BackButton id={id} />
      <motion.div className="title-wrapper" variants={titleVariants}>
        <motion.img
          className="title"
          src={`/drawer-titles/${id}.svg`}
          alt={title}
          draggable={false}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: 10,
            delay: animationType === 'forward' ? 1.5 : 0,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>
      {children}
      <BottomButtons id={id} containerRef={containerRef} />
    </Container>
  );
};
