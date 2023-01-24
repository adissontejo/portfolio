import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { drawers } from '~/data';
import { Drawers } from '~/types';

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

  const { columnWidth, animationType } = useDrawersContext();

  return (
    <Container
      className={className}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      initial={
        animationType === 'forward' && {
          x: `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth + 15}px)`,
        }
      }
      animate={
        animationType === 'forward' && {
          x: 0,
        }
      }
      exit={
        animationType === 'back' && {
          x: `calc(100vw - ${(rightToLeftPosition + 1) * columnWidth}px)`,
        }
      }
      transition={{ duration: 1.5, times: [0, 0.1, 1] }}
    >
      <BackButton id={id} color={color} />
      <motion.div
        className="title-wrapper"
        initial={
          animationType !== 'back' && {
            opacity: 0,
            y: -35,
          }
        }
        animate={{
          opacity: 1,
          y: 15,
          transition: {
            duration: 2.5,
            delay: 0,
          },
        }}
        exit={
          animationType === 'back' && {
            opacity: 0,
            y: -35,
            transition: { duration: 1.5 },
          }
        }
        transition={{ duration: 2 }}
      >
        <motion.img
          className="title"
          src={`/drawer-titles/${id}.svg`}
          alt={title}
          draggable={false}
          initial={{ y: 15 }}
          animate={{ y: -15 }}
          transition={{
            ease: 'easeInOut',
            duration: 10,
            delay: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>
      {children}
    </Container>
  );
};
