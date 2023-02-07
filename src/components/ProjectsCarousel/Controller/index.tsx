import { useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

import { projects } from '~/data';
import { AnimationVariants } from '~/types';

import { Container, TextsContainer } from './styles';
import { ArrowButton } from './ArrowButton';
import { useMeasures } from '../useMeasures';
import { ProjectText } from './ProjectText';

export type ControllerProps = {
  back: () => void;
  forward: () => void;
  carouselX: MotionValue<number>;
};

export const Controller = ({ back, forward, carouselX }: ControllerProps) => {
  const { carouselWidth } = useMeasures();

  const x = useTransform(carouselX, [0, carouselWidth], ['0%', '100%'], {
    clamp: false,
  });

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'ArrowLeft') {
        back();
      } else if (key === 'ArrowRight') {
        forward();
      }
    };

    window.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  }, [back, forward]);

  const textsVariants: AnimationVariants = {
    enterInitial: {
      y: '-100%',
    },
    whileInView: {
      y: 0,
      transition: {
        duration: 1,
        delay: 0.7,
      },
    },
    backExit: {
      y: '-100%',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container>
      <div className="arrow-wrapper">
        <ArrowButton type="back" onClick={back} />
        <ArrowButton type="forward" onClick={forward} />
      </div>
      <TextsContainer>
        <motion.div className="texts-wrapper" variants={textsVariants}>
          <motion.div className="carousel" style={{ x }}>
            {projects.map((item, index) => (
              <ProjectText
                key={index}
                name={item.name}
                about={item.about}
                index={index}
                length={projects.length}
                carouselX={carouselX}
              />
            ))}
          </motion.div>
        </motion.div>
      </TextsContainer>
    </Container>
  );
};
