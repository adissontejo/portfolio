import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { Drawer, Logo, ThemeSelector } from '~/components';
import { useDrawersContext } from '~/contexts';

interface HomeProps {
  themeMode: 'light' | 'dark';
}

const Home = ({ themeMode }: HomeProps) => {
  const { animationType, animationStates, variants } = useDrawersContext();

  // Grid container width - 30px of padding
  const barWidth = 'calc(min(80rem, 91.6667vw) - 30px)';

  const [iterationCount, setIterationCount] = useState(0);
  const [opening, setOpening] = useState(false);

  const logoVariants = variants({
    default: {
      opacity: 1,
      x: 0,
    },

    load: {
      initial: {
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
    },
  });

  return (
    <motion.div
      className="flex h-full w-full flex-col items-end bg-light transition-dark-mode dark:bg-dark"
      {...animationStates}
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
            className="pr-[70px] var-[x-target_0] var-[y-target_-30px] sm:pr-[190px] lg:pr-0 lg:var-[x-target_-30px] lg:var-[y-target_0]"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: iterationCount % 2 === 0 ? 'var(--x-target)' : 0,
              y: iterationCount % 2 === 0 ? 'var(--y-target)' : 0,
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
