import { ReactNode } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { Theme } from '~/styles';
import { Drawers } from '~/types';

import { BackBtn, Container } from './styles';

export type DrawerScreenProps = {
  id: Drawers;
  title: string;
  color: keyof Theme['colors'];
  rightToLeftPosition: number;
  children?: ReactNode;
};

export const DrawerScreen = ({
  id,
  title,
  color,
  rightToLeftPosition,
  children,
}: DrawerScreenProps) => {
  const { columnWidth, setTransitioning, closeDrawer } = useDrawersContext();

  const translateX = `calc(100vw - ${rightToLeftPosition * columnWidth}px)`;

  return (
    <Container
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      initial={{ translateX }}
      animate={{ translateX: 0 }}
      exit={{ translateX }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
      onAnimationComplete={() => setTransitioning(false)}
    >
      <Head>
        <title>Ádisson</title>
      </Head>
      <BackBtn
        color={color}
        initial={{ width: 0 }}
        animate={{ width: 'min(80vw, 560px)' }}
        exit={{
          width: 0,
          transition: { ease: 'easeInOut', duration: 0.7, delay: 0.3 },
        }}
        transition={{ ease: 'easeInOut', duration: 0.7, delay: 0.5 }}
        onClick={() => closeDrawer(id)}
      >
        <motion.div
          className="label-wrapper"
          initial={{ translateX: 'min(80vw, 560px)' }}
          animate={{ translateX: 0 }}
          exit={{
            translateX: 'min(80vw, 560px)',
            transition: { ease: 'easeInOut', duration: 0.7, delay: 0.3 },
          }}
          transition={{ ease: 'easeInOut', duration: 0.7, delay: 0.5 }}
        >
          <p className="label">voltar</p>
          <MdOutlineArrowBackIosNew className="icon" />
        </motion.div>
      </BackBtn>
      <img
        className="title"
        src={`/drawer-titles/${id}.svg`}
        alt={title}
        draggable={false}
      />
      {children}
    </Container>
  );
};
