import { useEffect } from 'react';
import {
  animate,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import { Container } from './styles';
import { useMeasures } from '../useMeasures';
import Image from 'next/image';

export type ProjectProps = {
  index: number;
  length: number;
  position: number;
  carouselX?: MotionValue<number>;
};

export const Project = ({ index, position, length }: ProjectProps) => {
  const { width } = useMeasures();

  const animatedPosition = useMotionValue(0);

  useEffect(() => {
    animate(animatedPosition, position, {
      duration: 0.5,
    });
  }, [position]);

  const x = useTransform(animatedPosition, value => {
    const max = length - 1;
    const min = 5 - length;

    if (index - value >= max) {
      const floor = Math.floor((index - value - max) / length) + 1;

      return (index - 2 - floor * length) * width;
    }

    if (index - value <= min) {
      const floor = Math.floor((min - index + value) / length) + 1;

      return (index - 2 + floor * length) * width;
    }

    return (index - 2) * width;
  });

  return (
    <Container style={{ x }}>
      <Image className="image" src="/projects/vampiro.png" alt="Projeto" fill />
    </Container>
  );
};
