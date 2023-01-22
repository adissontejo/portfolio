import { Container } from './styles';
import { useTranslateX } from '../../useTranslateX';

export type NameProps = {
  name: string;
  index: number;
  length: number;
  position: number;
};

export const Name = ({ name, index, length, position }: NameProps) => {
  const { x, opacity } = useTranslateX({
    width: 1000,
    position,
    index,
    length,
  });

  return <Container style={{ x, opacity }}>{name}</Container>;
};
