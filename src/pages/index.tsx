import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { Drawer, Logo, ModeSelector } from '~/components';
import { useDrawersContext, useStylesContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { useMediaQuery } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container, Grid } from './styles';

const Home = () => {
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
    <Container {...animationStates}>
      <Head>
        <title>Ádisson</title>
      </Head>
      <header>
        <ModeSelector />
      </header>
      <Grid>
        <motion.div className="logo-wrapper" variants={logoVariants}>
          <motion.div
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
            <Logo />
          </motion.div>
        </motion.div>
        {Object.keys(drawers).map((item: DrawerId) => (
          <Drawer
            key={item}
            id={item}
            opening={opening}
            setOpening={setOpening}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
