import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

const barAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

const columnAnimation = keyframes`
  from {
    height: 0;
  }

  to {
    height: 100vh;
  }
`;

export type ContainerProps = {
  gridArea: string;
  color: keyof Theme['colors'];
  position: number;
};

export const Container = styled(motion.button)<ContainerProps>`
  grid-area: ${p => p.gridArea};
  z-index: ${p => 100 - p.position};

  width: 100%;
  height: 50px;

  display: flex;
  justify-content: flex-end;

  cursor: pointer;

  > .bar {
    z-index: 10;

    height: 50px;
    background: ${p => p.theme.colors[p.color]};

    display: flex;
    align-items: center;

    animation: ${barAnimation} 2s ease-in-out ${p => 1 + p.position * 0.2}s both;
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
    right: -15px;
    z-index: 0;

    width: ${p => (p.position + 1) * 60 + 15}px;
    background: ${p => p.theme.colors[p.color]};

    animation: ${columnAnimation} 1s ${p => p.position * 0.2}s ease-in-out both;
    transition: transform 0.2s;
  }

  &:hover {
    > .bar,
    > .column {
      transform: translateX(-15px);
    }
  }
`;
