import { ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';

import { useInViewAnimation, useMeasures } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type SectionProps = {
  title: string;
  children?: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  const { ref, element, viewport } = useMeasures<HTMLDivElement>();

  const animationStates = useInViewAnimation(0.5);

  const amount = useMemo(() => {
    if (!element.height || !viewport.height) {
      return 1;
    }

    return Math.min(viewport.height / element.height, 0.5);
  }, [viewport, element]);

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
      <motion.div
        ref={ref}
        className="wrapper"
        viewport={{ once: true, amount }}
        {...animationStates}
      >
        <motion.h4 className="title" variants={titleVariants}>
          {title}
        </motion.h4>
        {children}
      </motion.div>
      <motion.div className="divisor" variants={divisorVariants} />
    </Container>
  );
};
