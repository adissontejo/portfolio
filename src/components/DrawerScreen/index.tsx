import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { drawers } from '~/data';
import { Drawers } from '~/types';

import { BackBtn, Container } from './styles';

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

  const { columnWidth, animationType, hover, closeDrawer } =
    useDrawersContext();

  const x = `calc(100vw - ${
    (rightToLeftPosition + 1) * columnWidth + (hover === id ? 15 : 0)
  }px)`;

  return (
    <Container
      className={className}
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      initial={animationType === 'forward' && { x }}
      animate={{ x: 0 }}
      exit={{ x }}
      transition={{ duration: 1.5 }}
    >
      <BackBtn
        color={color}
        initial={animationType !== 'back' && { width: 0 }}
        animate={{
          width: 'min(max(265px, 75vw), 485px)',
        }}
        exit={
          animationType === 'back' && {
            width: 0,
            transition: { duration: 0.7, delay: 0.3 },
          }
        }
        transition={{
          duration: animationType === 'forward' ? 0.7 : 1,
          delay: animationType === 'forward' ? 0.5 : 1,
        }}
        onClick={() => closeDrawer(id)}
      >
        <motion.div
          className="label-wrapper"
          initial={animationType !== 'back' && { x: 'min(80vw, 560px)' }}
          animate={{ x: 0 }}
          exit={{
            x: 'min(80vw, 560px)',
            transition: { duration: 0.7, delay: 0.3 },
          }}
          transition={{
            duration: animationType === 'forward' ? 0.7 : 1,
            delay: animationType === 'forward' ? 0.5 : 1,
          }}
        >
          <p className="label">voltar</p>
          <MdOutlineArrowBackIosNew className="icon" />
        </motion.div>
      </BackBtn>
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
