import { motion } from 'framer-motion';

import { projects } from '~/data';
import { AnimationVariants } from '~/types';

import {
  AboutContainer,
  Container,
  NamesContainer,
  OpacityFilter,
} from './styles';
import { About } from './About';
import { Name } from './Name';
import { ArrowButton } from './ArrowButton';

export type ControllerProps = {
  back: () => void;
  forward: () => void;
  position: number;
};

export const Controller = ({ back, forward, position }: ControllerProps) => {
  const aboutVariants: AnimationVariants = {
    enterInitial: {
      y: '-100%',
    },
    backInitial: {
      y: 0,
    },
    whileInView: {
      y: 0,
      transition: {
        duration: 1.5,
        delay: 1,
      },
    },
    backExit: {
      y: '-100%',
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <>
      <Container>
        <ArrowButton type="back" onClick={back} />
        <NamesContainer>
          <motion.div
            className="names-wrapper"
            animate={{ x: -1000 * position }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((item, index) => (
              <Name
                key={index}
                name={item.name}
                index={index}
                position={position}
                length={projects.length}
              />
            ))}
          </motion.div>
        </NamesContainer>
        <ArrowButton type="forward" onClick={forward} />
      </Container>
      <AboutContainer>
        <OpacityFilter type="top" />
        <OpacityFilter type="left" />
        <OpacityFilter type="right" />
        <motion.div
          animate={{ x: -1000 * position }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="about-wrapper" variants={aboutVariants}>
            {projects.map((item, index) => (
              <About
                key={index}
                about={item.about}
                index={index}
                position={position}
                length={projects.length}
              />
            ))}
          </motion.div>
        </motion.div>
      </AboutContainer>
    </>
  );
};
