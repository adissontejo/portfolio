import { Container } from './styles';

const Experiences = () => {
  return (
    <Container
      initial={{ position: 'absolute', x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeInOut', duration: 1.5, delay: 0 }}
    >
      <h1>experiências</h1>
    </Container>
  );
};

export default Experiences;
