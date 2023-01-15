import styled from 'styled-components';

import { Theme } from '~/styles';

export type ContainerProps = {
  gridArea: string;
  color: keyof Theme['colors'];
  position: number;
};

export const Container = styled.button<ContainerProps>`
  grid-area: ${p => p.gridArea};
  z-index: ${p => 100 - p.position};

  width: 100%;
  height: 50px;

  cursor: pointer;

  > .bar {
    z-index: 10;

    width: 100%;
    height: 50px;
    background: ${p => p.theme.colors[p.color]};

    display: flex;
    align-items: center;

    transition: transform 0.2s;

    > .label {
      margin: 0 0 0 33px;

      color: ${p => p.theme.colors.light};
      font-size: 20px;
    }
  }

  > .column {
    position: fixed;
    top: 0;
    right: ${p => p.position * 60 - 15}px;
    z-index: 0;

    width: 75px;
    height: 100%;
    background: ${p => p.theme.colors[p.color]};

    transition: transform 0.2s;
  }

  &:hover {
    > .bar,
    > .column {
      transform: translateX(-15px);
    }
  }
`;
