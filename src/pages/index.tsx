import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { Drawer, Logo } from '~/components';
import { useDrawersContext, useStylesContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { useMediaQuery } from '~/hooks';

import { Container } from './styles';

const Home = () => {
  const { theme } = useStylesContext();
  const { animationType } = useDrawersContext();

  const isRegularOrLower = useMediaQuery(theme.queries.regularAndLower);

  const [iterationCount, setIterationCount] = useState(0);

  return (
    <Container>
      <Head>
        <title>Ádisson</title>
      </Head>
      <motion.div
        initial={
          animationType === 'load' && {
            opacity: 0,
            x: isRegularOrLower ? 0 : -50,
            y: isRegularOrLower ? -50 : 0,
          }
        }
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0, duration: 3 }}
        className="logo-wrapper"
      >
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{
            x: isRegularOrLower || iterationCount % 2 === 1 ? 0 : -30,
            y: isRegularOrLower && iterationCount % 2 === 0 ? -30 : 0,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 10,
            delay: animationType === 'load' && iterationCount === 0 ? 3 : 0,
          }}
          onAnimationComplete={() => setIterationCount(prev => prev + 1)}
        >
          <Logo />
        </motion.div>
      </motion.div>
      {Object.keys(drawers).map((item: DrawerId) => (
        <Drawer key={item} id={item} />
      ))}
    </Container>
  );
};

export default Home;
