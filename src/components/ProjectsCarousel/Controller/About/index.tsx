import { Container, Text } from './styles';
import { useTranslateX } from '../../useTranslateX';

export type AboutProps = {
  about: string;
  index: number;
  length: number;
  position: number;
};

export const About = ({ about, index, length, position }: AboutProps) => {
  const { x, opacity } = useTranslateX({
    width: 1000,
    position,
    index,
    length,
  });

  return (
    <Container style={{ x, opacity }}>
      <Text>{about}</Text>
    </Container>
  );
};
