import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { useInViewAnimation } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type SectionProps = {
  title: string;
  children?: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  const inViewProps = useInViewAnimation<HTMLDivElement>();

  const titleVariants: AnimationVariants = {
    enterInitial: {
      opacity: 0,
      y: 30,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    backExit: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 1,
      },
    },
  };

  const divisorVariants: AnimationVariants = {
    enterInitial: {
      width: 0,
    },
    animate: {
      width: 'min(75%, 440px)',
      transition: {
        duration: 1,
      },
    },
    backExit: {
      width: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container>
      <motion.div className="wrapper" {...inViewProps}>
        <motion.h4 className="title" variants={titleVariants}>
          {title}
        </motion.h4>
        {children}
      </motion.div>
      <motion.div className="divisor" variants={divisorVariants} />
    </Container>
  );
};
