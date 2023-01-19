import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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
  const router = useRouter();

  const { columnWidth, closeDrawer } = useDrawersContext();

  const [active, setActive] = useState(true);

  const navigate = async () => {
    if (!active) {
      return;
    }

    setActive(false);

    closeDrawer(id);
  };

  useEffect(() => {
    setActive(router.pathname === `/${id}`);
  }, [router.pathname]);

  const translateX = `calc(100vw - ${rightToLeftPosition * columnWidth}px)`;

  return (
    <Container
      color={color}
      rightToLeftPosition={rightToLeftPosition}
      initial={{ translateX }}
      animate={{ translateX: 0 }}
      exit={{ translateX }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
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
        onClick={navigate}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { ease: 'easeInOut', duration: 0.5, delay: 0.3 },
          }}
          transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.7 }}
          className="label"
        >
          voltar
        </motion.p>
      </BackBtn>
      <h1>{title}</h1>
      {children}
    </Container>
  );
};
