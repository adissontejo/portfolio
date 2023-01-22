import { Container } from './styles';
import { useMeasures } from '../useMeasures';
import Image from 'next/image';
import { useTranslateX } from '../useTranslateX';

export type ProjectProps = {
  src: string;
  index: number;
  length: number;
  position: number;
};

export const Project = ({ src, index, position, length }: ProjectProps) => {
  const { width } = useMeasures();

  const { x } = useTranslateX({ width, position, index, length });

  return (
    <Container style={{ x }}>
      <Image className="image" src={src} alt="Projeto" fill />
    </Container>
  );
};
