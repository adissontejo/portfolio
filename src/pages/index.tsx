import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { Drawer, Logo, ThemeSelector } from '~/components';
import { useDrawersContext, useStylesContext } from '~/contexts';
import { useMediaQuery } from '~/hooks';
import { AnimationVariants } from '~/types';

interface HomeProps {
  themeMode: 'light' | 'dark';
}

const Home = ({ themeMode }: HomeProps) => {
  const { theme } = useStylesContext();
  const { animationType, animationStates } = useDrawersContext();

  const isRegularOrLower = useMediaQuery(theme.queries.regularAndLower);

  const barWidth = isRegularOrLower
    ? 'calc(100vw - 36px)'
    : 'min(85vw - 380px, 1120px)';

  const [iterationCount, setIterationCount] = useState(0);
  const [opening, setOpening] = useState(false);

  const logoVariants: AnimationVariants = {
    loadInitial: {
      opacity: 0,
      x: barWidth,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        delay: 1.5,
        opacity: {
          duration: 1.5,
          delay: 2,
        },
      },
    },
  };

  return (
    <motion.div
      {...animationStates}
      className="flex h-full w-full flex-col items-end bg-light transition-dark-mode dark:bg-dark"
    >
      <Head>
        <title>Ádisson</title>
      </Head>
      <header className="flex w-full pl-9 pt-8">
        <ThemeSelector initialMode={themeMode} />
      </header>
      <motion.div className="flex h-full w-11/12 max-w-7xl flex-col content-center items-start justify-center gap-10 overflow-x-visible pb-16 lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[70px_auto_70px] lg:items-center lg:gap-0">
        <motion.div
          className="mb-3 me-6 lg:my-20 lg:mr-16"
          variants={logoVariants}
        >
          <motion.div
            className="pr-[70px] sm:pr-[190px] lg:pr-0"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: isRegularOrLower || iterationCount % 2 === 1 ? 0 : -30,
              y: isRegularOrLower && iterationCount % 2 === 0 ? -30 : 0,
            }}
            transition={{
              ease: 'easeInOut',
              duration: 12,
              delay: animationType === 'load' && iterationCount === 0 ? 3 : 0,
            }}
            onAnimationComplete={() => setIterationCount(prev => prev + 1)}
          >
            <Logo className="pl-[30px]" />
          </motion.div>
        </motion.div>
        <Drawer
          id="experiences"
          opening={opening}
          setOpening={setOpening}
          className="lg:col-span-2 lg:row-start-1"
        />
        <Drawer id="qualifications" opening={opening} setOpening={setOpening} />
        <Drawer
          id="contact"
          opening={opening}
          setOpening={setOpening}
          className="lg:col-span-2"
        />
      </motion.div>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
  res,
}) => {
  const themeMode = (getCookie('theme-mode', { req, res }) || 'light') as
    | 'light'
    | 'dark';

  return {
    props: {
      themeMode,
    },
  };
};

export default Home;
