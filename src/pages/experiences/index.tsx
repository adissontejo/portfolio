import Head from 'next/head';
import { motion } from 'framer-motion';

import { ProjectsCarousel } from '~/components';

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
        <div className="experience">
          <motion.div
            className="bar"
            initial={{ x: '-100%' }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -200px' }}
          />
          <p className="label">Estágio no Tribunal de Contas da União</p>
        </div>
      </Section>
    </Container>
  );
};

export default Experiences;
