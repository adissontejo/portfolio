import Head from 'next/head';
import { motion } from 'framer-motion';

import { ProjectsCarousel } from '~/components';
import { useInViewAnimation } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container, Section } from './styles';

const Experiences = () => {
  const animationStates = useInViewAnimation(0);

  const barVariants: AnimationVariants = {
    initial: {
      x: '-100%',
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

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
        <div className="experience">
          <motion.div
            className="bar"
            variants={barVariants}
            {...animationStates}
          />
          <p className="label">Estágio no Tribunal de Contas da União</p>
        </div>
      </Section>
    </Container>
  );
};

export default Experiences;
