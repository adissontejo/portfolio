import Head from 'next/head';

import { ProfessionalExperiences, ProjectsCarousel } from '~/components';

import { Container, Section } from './styles';

const Experiences = () => {
  return (
    <Container id="experiences">
      <Head>
        <title>Ádisson · Experiências</title>
      </Head>
      <Section>
        <h4 className="subtitle">meus projetos</h4>
        <ProjectsCarousel />
      </Section>
      <Section>
        <h4 className="subtitle">experiência profissional</h4>
        <ProfessionalExperiences />
      </Section>
    </Container>
  );
};

export default Experiences;
