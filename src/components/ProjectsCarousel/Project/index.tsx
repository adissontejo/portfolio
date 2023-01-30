import { MotionValue } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

import { Container } from './styles';
import { useMeasures } from '../useMeasures';
import { useTranslateX } from '../useTranslateX';

export type ProjectProps = {
  src: StaticImageData;
  index: number;
  length: number;
  carouselX: MotionValue<number>;
};

export const Project = ({ src, index, length, carouselX }: ProjectProps) => {
  const { imageWidth } = useMeasures();

  const { x } = useTranslateX(carouselX, {
    width: imageWidth,
    index,
    length,
  });

  return (
    <Container style={{ x }}>
      <Image
        className="image"
        src={src}
        alt="Projeto"
        draggable={false}
        fill
        quality={70}
        placeholder="blur"
      />
    </Container>
  );
};
