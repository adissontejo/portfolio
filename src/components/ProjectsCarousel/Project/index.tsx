import { MotionValue, useMotionTemplate, useTransform } from 'framer-motion';

import { Container } from './styles';
import { useMeasures } from '../useMeasures';
import Image from 'next/image';

export type ProjectProps = {
  index: number;
  length: number;
  position: MotionValue<number>;
  entering?: boolean;
};

export const Project = ({
  index,
  position,
  length,
  entering,
}: ProjectProps) => {
  const { radius } = useMeasures();

  const rotate = useTransform(position, value => {
    const min = 3 - length;
    const max = length - 3;

    if (entering) {
      return index * 20;
    }

    if (index - value <= min) {
      return (index + 6 * Math.ceil((value - index + min) / 6)) * 20;
    }

    if (index - value >= max) {
      return (index - 6 * Math.ceil((index - value - max) / 6)) * 20;
    }

    return index * 20;
  });

  const offset = useTransform(
    [position, rotate],
    ([positionValue, rotateValue]: number[]) => rotateValue - 20 * positionValue
  );

  const opacity = useTransform(offset, [-60, -40, 0, 40, 60], [0, 1, 1, 1, 0]);

  const transform = useMotionTemplate`rotateY(${rotate}deg) translateZ(${radius}px)`;

  return (
    <Container style={{ transform, opacity }}>
      <Image src="/projects/vampiro.png" alt="Projeto" fill />
    </Container>
  );
};
