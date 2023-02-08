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
  const type = index % 2 === 0 ? 'left' : 'right';

  const barVariants: AnimationVariants = {
    enterInitial: {
      x: type === 'left' ? '-101%' : '101%',
    },
    backInitial: {
      x: 0,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5 * index,
      },
    },
    exit: {
      x: type === 'left' ? '-101%' : '101%',
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
    <Container type={type}>
      <div className="header">
        <motion.div className="bar" variants={barVariants}>
          <p className="label">
            {name} <br />
          </p>
        </motion.div>
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
