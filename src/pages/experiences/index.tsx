import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { motion } from 'framer-motion';

import { BackBtn, Container } from './styles';

const Experiences = () => {
  const router = useRouter();

  const navigate = () => {
    setCookie('preventAnimations', true);

    router.back();
  };

  return (
    <Container
      initial={{ position: 'absolute', x: 'calc(100vw - 60px)' }}
      animate={{ x: 0 }}
      exit={{ position: 'absolute', x: 'calc(100vw - 60px)' }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
    >
      <BackBtn
        initial={{ translateX: '-100vw' }}
        animate={{ translateX: 0 }}
        exit={{ translateX: '-100vw' }}
        transition={{ ease: 'easeInOut', duration: 1.5 }}
        onClick={navigate}
      >
        <motion.p
          initial={{ translateX: '100vw' }}
          animate={{ translateX: 0 }}
          exit={{ translateX: '100vw' }}
          transition={{ ease: 'easeInOut', duration: 1.5 }}
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
