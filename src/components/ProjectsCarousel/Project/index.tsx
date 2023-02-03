import { MotionValue } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

import { Container } from './styles';
import { useTranslateX } from '../useTranslateX';

export type ProjectProps = {
  src: StaticImageData;
  index: number;
  length: number;
  carouselX: MotionValue<number>;
};

export const Project = ({ src, index, length, carouselX }: ProjectProps) => {
  const { x } = useTranslateX(carouselX, {
    index,
    length,
  });

  return (
    <Container style={{ x }}>
      <div className="image-wrapper">
        <Image
          className="image"
          src={src}
          alt="Projeto"
          draggable={false}
          fill
          quality={70}
          placeholder="blur"
        />
      </div>
    </Container>
  );
};
