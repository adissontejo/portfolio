import { ProjectsCarousel } from '~/components';

import { Container, Section } from './styles';

const Experiences = () => {
  return (
    <Container
      id="experiences"
      title="experiências"
      color="green"
      rightToLeftPosition={1}
    >
      <Section>
        <h4 className="subtitle">meus projetos</h4>
        <ProjectsCarousel />
      </Section>
    </Container>
  );
};

export default Experiences;
