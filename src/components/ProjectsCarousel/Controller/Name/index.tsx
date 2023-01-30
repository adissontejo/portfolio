import { MotionValue } from 'framer-motion';

import { Container } from './styles';
import { useTranslateX } from '../../useTranslateX';
import { useMeasures } from '../../useMeasures';

export type NameProps = {
  name: string;
  index: number;
  length: number;
  carouselX: MotionValue<number>;
};

export const Name = ({ name, index, length, carouselX }: NameProps) => {
  const { textWidth } = useMeasures();

  const { x, opacity } = useTranslateX(carouselX, {
    width: textWidth,
    index,
    length,
  });

  return <Container style={{ x, opacity }}>{name}</Container>;
};
