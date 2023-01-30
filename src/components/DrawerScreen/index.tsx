import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { drawers } from '~/data';
import { AnimationVariants, Drawers } from '~/types';

import { Container } from './styles';
import { BackButton } from './BackButton';

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

  const { columnWidth, animationType, animationStates } = useDrawersContext();

  const containerVariants: AnimationVariants = {
    forwardInitial: {
      x: `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth + 15}px)`,
    },
    animate: {
      x: 0,
      transition: {
        duration: 1.5,
      },
    },
    backExit: {
      x: `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth}px)`,
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
      className={className}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      variants={containerVariants}
      {...animationStates}
    >
      <BackButton id={id} color={color} />
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
    </Container>
  );
};
