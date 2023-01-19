import Head from 'next/head';

import { Drawer, Logo } from '~/components';
import { useDrawersContext } from '~/contexts';

import { Container } from './styles';

const Home = () => {
  const { isInitialPage } = useDrawersContext();

  return (
    <Container animateEntrance={isInitialPage}>
      <Head>
        <title>Ádisson</title>
      </Head>
      <div className="logo-wrapper">
        <Logo />
      </div>
      <Drawer
        id="experiences"
        label="experiências"
        color="green"
        iconSrc="/experiences.svg"
        rightToLeftPosition={1}
        href="/experiences"
      />
      <Drawer
        id="qualifications"
        label="qualificações"
        color="brown"
        iconSrc="/qualifications.svg"
        rightToLeftPosition={0}
        href="/qualifications"
      />
      <Drawer
        id="contact"
        label="contato"
        color="purple"
        iconSrc="/contact.svg"
        rightToLeftPosition={2}
        href="/contact"
      />
    </Container>
  );
};

export default Home;
