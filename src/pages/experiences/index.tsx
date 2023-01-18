import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';

import { BackBtn, Container } from './styles';

const Experiences = () => {
  const router = useRouter();

  const { columnWidth } = useDrawersContext();

  const [active, setActive] = useState(true);

  const navigate = () => {
    if (!active) {
      return;
    }

    setActive(false);

    router.back();
  };

  useEffect(() => {
    if (router.pathname === '/experiences') {
      setActive(true);

      const listener = () => {
        setCookie('preventAnimations', true);

        router.events.off('routeChangeStart', listener);
      };

      router.events.on('routeChangeStart', listener);
    }
  }, [router.pathname]);

  return (
    <Container
      initial={{ translateX: `calc(100vw - ${columnWidth}px)` }}
      animate={{ translateX: 0 }}
      exit={{ translateX: `calc(100vw - ${columnWidth}px)` }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
    >
      <BackBtn
        initial={{ width: 0 }}
        animate={{ width: 330 }}
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
      <h1>experiências</h1>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const transitioned = getCookie('transitioned', { req, res });
  deleteCookie('transitioned', { req, res });

  if (!transitioned) {
    setCookie('redirect', 'experiences', { req, res });
    setCookie('preventAnimations', true, { req, res });

    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default Experiences;
