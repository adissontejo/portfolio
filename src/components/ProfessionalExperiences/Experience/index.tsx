import { motion } from 'framer-motion';

import { AnimationVariants } from '~/types';

import { Container, OpacityFilter } from './styles';

export type ExperienceProps = {
  name: string;
  about: string;
  init: string;
  end: string;
  index: number;
};

export const Experience = ({ name, about, index }: ExperienceProps) => {
  const barVariants: AnimationVariants = {
    enterInitial: {
      width: 0,
    },
    backInitial: {
      width: '100%',
    },
    whileInView: {
      width: '100%',
      transition: {
        duration: 1,
        delay: 0.5 * index,
      },
    },
    exit: {
      width: 0,
      transition: {
        duration: 1,
      },
    },
  };

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
        delay: 1 + 0.5 * index,
      },
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container type={index % 2 === 0 ? 'left' : 'right'}>
      <div className="header">
        <p className="label">{name}</p>
        <motion.div className="bar" variants={barVariants} />
      </div>
      <div className="about-wrapper">
        <OpacityFilter />
        <motion.p className="about" variants={aboutVariants}>
          {about}
        </motion.p>
      </div>
    </Container>
  );
};
