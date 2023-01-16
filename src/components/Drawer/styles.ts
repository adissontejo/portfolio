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
  animateEntrances: boolean;
};

export const Container = styled(motion.button)<ContainerProps>`
  grid-area: ${p => p.gridArea};
  z-index: ${p => (2 - p.position) * 10};

  width: 100%;
  height: 50px;

  display: flex;
  justify-content: flex-end;

  cursor: pointer;

  > .bar {
    position: relative;
    right: 0;

    width: 100%;
    height: 50px;
    background: ${p => p.theme.colors[p.color]};

    display: flex;
    align-items: center;
    overflow: hidden;

    animation: ${p => (p.animateEntrances ? barAnimation : 'none')} 2s
      ease-in-out ${p => 1 + p.position * 0.2}s both;
    transition: right 0.2s;

    > .label {
      margin: 0 0 0 33px;

      color: ${p => p.theme.colors.light};
      font-size: 20px;
    }
  }

  > .column {
    position: fixed;
    top: 0;
    right: -100vw;

    width: calc(${p => (p.position + 1) * 60}px + 100vw);
    height: 100vh;
    background: ${p => p.theme.colors[p.color]};

    animation: ${p => (p.animateEntrances ? columnAnimation : 'none')} 1s
      ${p => p.position * 0.2}s ease-in-out both;
    transition: right 0.2s;
  }

  &:hover {
    > .bar {
      right: 15px;
    }

    > .column {
      right: calc(-100vw + 15px);
    }
  }
`;
