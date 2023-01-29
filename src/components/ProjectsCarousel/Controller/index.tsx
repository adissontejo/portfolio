import { m } from 'framer-motion';

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
        duration: 1,
        delay: 1,
      },
    },
    backExit: {
      y: '-100%',
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <Container>
        <ArrowButton type="back" onClick={back} />
        <NamesContainer>
          <m.div
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
          </m.div>
        </NamesContainer>
        <ArrowButton type="forward" onClick={forward} />
      </Container>
      <AboutContainer>
        <OpacityFilter type="top" />
        <OpacityFilter type="left" />
        <OpacityFilter type="right" />
        <m.div animate={{ x: -1000 * position }} transition={{ duration: 0.5 }}>
          <m.div className="about-wrapper" variants={aboutVariants}>
            {projects.map((item, index) => (
              <About
                key={index}
                about={item.about}
                index={index}
                position={position}
                length={projects.length}
              />
            ))}
          </m.div>
        </m.div>
      </AboutContainer>
    </>
  );
};
