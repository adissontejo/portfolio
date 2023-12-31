import {
  AcademicActivities,
  DrawerScreen,
  ProfessionalExperiences,
  ProjectsCarousel,
  Section,
} from '~/components';

const Experiences = () => {
  return (
    <DrawerScreen>
      <Section title="meus projetos">
        <ProjectsCarousel />
      </Section>
      <Section title="experiência profissional">
        <ProfessionalExperiences />
      </Section>
      <Section title="atividades acadêmicas">
        <AcademicActivities />
      </Section>
    </DrawerScreen>
  );
};

export default Experiences;
