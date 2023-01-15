import { Drawer } from '~/components';

import { Container } from './styles';

const Home = () => {
  return (
    <Container>
      <img className="logo" src="/logo.svg" alt="Logo" draggable={false} />
      <Drawer
        label="experiências"
        color="green"
        rightToLeftPosition={1}
        gridArea="experiences"
      />
      <Drawer
        label="qualificações"
        color="brown"
        rightToLeftPosition={0}
        gridArea="qualifications"
      />
      <Drawer
        label="contato"
        color="purple"
        rightToLeftPosition={2}
        gridArea="contact"
      />
    </Container>
  );
};

export default Home;
