import Head from 'next/head';

import {
  ProfessionalExperiences,
  ProjectsCarousel,
  Section,
} from '~/components';

import { Container } from './styles';

const Experiences = () => {
  return (
    <Container id="experiences">
      <Head>
        <title>Ádisson · Experiências</title>
      </Head>
      <Section title="meus projetos">
        <ProjectsCarousel />
      </Section>
      <Section title="experiência profissional">
        <ProfessionalExperiences />
      </Section>
    </Container>
  );
};

export default Experiences;
