import Head from 'next/head';
import { motion } from 'framer-motion';

import { Drawer, Logo } from '~/components';
import { useDrawersContext, useStylesContext } from '~/contexts';
import { useMediaQuery } from '~/hooks';

import { Container } from './styles';

const Home = () => {
  const { theme } = useStylesContext();
  const { animationType } = useDrawersContext();

  const isRegularOrLower = useMediaQuery(theme.queries.regularAndLower);

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
        transition={{ duration: 3 }}
        className="logo-wrapper"
      >
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{
            x: isRegularOrLower ? 0 : -30,
            y: isRegularOrLower ? -30 : 0,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 10,
            delay: animationType === 'load' ? 3 : 0,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Logo />
        </motion.div>
      </motion.div>
      <Drawer
        id="experiences"
        label="experiências"
        color="green"
        rightToLeftPosition={1}
        href="/experiences"
      />
      <Drawer
        id="qualifications"
        label="qualificações"
        color="brown"
        rightToLeftPosition={0}
        href="/qualifications"
      />
      <Drawer
        id="contact"
        label="contato"
        color="purple"
        rightToLeftPosition={2}
        href="/contact"
      />
    </Container>
  );
};

export default Home;
