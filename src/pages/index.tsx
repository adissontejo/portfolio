import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { Drawer } from '~/components';

import { Container } from './styles';
import { useDrawersContext } from '~/contexts';
import { Drawers } from '~/types';

type HomeProps = {
  preventAnimations: boolean;
};

const Home = ({ preventAnimations }: HomeProps) => {
  const router = useRouter();

  const { setActiveDrawer } = useDrawersContext();

  useEffect(() => {
    const redirect = getCookie('redirect');

    deleteCookie('redirect');
    deleteCookie('preventAnimations');

    if (typeof redirect === 'string') {
      setCookie('transitioned', true);

      setActiveDrawer(redirect as Drawers);

      router.push(`/${redirect}`);
    }
  }, []);

  return (
    <Container
      exit={{ position: 'absolute' }}
      animateEntrance={!preventAnimations}
    >
      <img className="logo" src="/logo.svg" alt="Logo" draggable={false} />
      <Drawer
        id="experiences"
        label="experiências"
        color="green"
        rightToLeftPosition={1}
        href="/experiences"
        preventAnimations={preventAnimations}
      />
      <Drawer
        id="qualifications"
        label="qualificações"
        color="brown"
        rightToLeftPosition={0}
        href="/qualifications"
        preventAnimations={preventAnimations}
      />
      <Drawer
        id="contact"
        label="contato"
        color="purple"
        rightToLeftPosition={2}
        href="/contact"
        preventAnimations={preventAnimations}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
  res,
}) => {
  const preventAnimations = !!getCookie('preventAnimations', { req, res });

  return {
    props: {
      preventAnimations,
    },
  };
};

export default Home;
