import { Theme } from '~/styles';

import { Container } from './styles';

export type DrawerProps = {
  label: string;
  color: keyof Theme['colors'];
  gridArea: string;
  rightToLeftPosition: number;
};

export const Drawer = ({
  label,
  color,
  gridArea,
  rightToLeftPosition,
}: DrawerProps) => {
  return (
    <Container gridArea={gridArea} color={color} position={rightToLeftPosition}>
      <div className="bar">
        <p className="label">{label}</p>
      </div>
      <div className="column"></div>
    </Container>
  );
};
