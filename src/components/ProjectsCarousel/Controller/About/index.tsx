import { MotionValue } from 'framer-motion';

import { Container, Text } from './styles';
import { useTranslateX } from '../../useTranslateX';
import { useMeasures } from '../../useMeasures';

export type AboutProps = {
  about: string;
  index: number;
  length: number;
  carouselX: MotionValue<number>;
};

export const About = ({ about, index, length, carouselX }: AboutProps) => {
  const { textWidth } = useMeasures();

  const { x, opacity } = useTranslateX(carouselX, {
    width: textWidth,
    index,
    length,
  });

  return (
    <Container style={{ x, opacity }}>
      <Text>{about}</Text>
    </Container>
  );
};
