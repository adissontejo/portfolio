import { MotionValue } from 'framer-motion';

import { Container } from './styles';
import { useTranslateX } from '../../useTranslateX';

export type ProjectTextProps = {
  name: string;
  about: string;
  index: number;
  length: number;
  carouselX: MotionValue<number>;
};

export const ProjectText = ({
  name,
  about,
  index,
  length,
  carouselX,
}: ProjectTextProps) => {
  const { x } = useTranslateX(carouselX, { index, length });

  return (
    <Container style={{ x }}>
      <div className="name-wrapper">
        <h2 className="name">{name}</h2>
      </div>
      <div className="about-wrapper">
        <p className="about">{about}</p>
      </div>
    </Container>
  );
};
