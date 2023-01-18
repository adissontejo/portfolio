import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { Drawer, Logo } from '~/components';
import { useDrawersContext } from '~/contexts';
import { Drawers } from '~/types';

import { Container } from './styles';

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
      setActiveDrawer(redirect as Drawers);

      router.push(`/${redirect}`);
    }
  }, []);

  useEffect(() => {
    if (router.pathname === '/') {
      const listener = () => {
        setCookie('transitioned', true);

        router.events.off('routeChangeStart', listener);
      };

      router.events.on('routeChangeStart', listener);
    }
  }, [router.pathname]);

  return (
    <Container animateEntrance={!preventAnimations}>
      <div className="logo-wrapper">
        <Logo />
      </div>
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
