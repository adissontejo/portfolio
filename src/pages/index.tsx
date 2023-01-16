import { useState } from 'react';

import { Drawer } from '~/components';

import { Container } from './styles';

const Home = () => {
  const [selectedDrawer, setSelectedDrawer] = useState<
    'experiences' | 'contact' | 'qualifications'
  >();

  return (
    <Container exit={{ position: 'absolute' }}>
      <img className="logo" src="/logo.svg" alt="Logo" draggable={false} />
      <Drawer
        label="experiências"
        color="green"
        rightToLeftPosition={1}
        gridArea="experiences"
        href="/experiences"
        selected={selectedDrawer === 'experiences'}
        onSelect={() => setSelectedDrawer('experiences')}
      />
      <Drawer
        label="qualificações"
        color="brown"
        rightToLeftPosition={0}
        gridArea="qualifications"
        href="/qualifications"
        selected={selectedDrawer === 'qualifications'}
        onSelect={() => setSelectedDrawer('qualifications')}
      />
      <Drawer
        label="contato"
        color="purple"
        rightToLeftPosition={2}
        gridArea="contact"
        href="/contact"
        selected={selectedDrawer === 'contact'}
        onSelect={() => setSelectedDrawer('contact')}
      />
    </Container>
  );
};

export default Home;
