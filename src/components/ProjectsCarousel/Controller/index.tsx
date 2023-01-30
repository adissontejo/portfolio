import { motion, MotionValue, useTransform } from 'framer-motion';

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
import { useMeasures } from '../useMeasures';

export type ControllerProps = {
  back: () => void;
  forward: () => void;
  carouselX: MotionValue<number>;
};

export const Controller = ({ back, forward, carouselX }: ControllerProps) => {
  const { imageWidth, textWidth } = useMeasures();

  const x = useTransform(carouselX, [0, imageWidth], [0, textWidth], {
    clamp: false,
  });

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
          <motion.div className="names-wrapper" style={{ x }}>
            {projects.map((item, index) => (
              <Name
                key={index}
                name={item.name}
                index={index}
                length={projects.length}
                carouselX={carouselX}
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
        <motion.div style={{ x }}>
          <motion.div className="about-wrapper" variants={aboutVariants}>
            {projects.map((item, index) => (
              <About
                key={index}
                about={item.about}
                index={index}
                length={projects.length}
                carouselX={carouselX}
              />
            ))}
          </motion.div>
        </motion.div>
      </AboutContainer>
    </>
  );
};
