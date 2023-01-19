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
  rightToLeftPosition: number;
  animateEntrances: boolean;
};

export const Container = styled(motion.button)<ContainerProps>`
  grid-area: ${p => p.gridArea};
  z-index: ${p => (2 - p.rightToLeftPosition) * 10};
  position: relative;

  width: 100%;

  display: flex;
  justify-self: flex-end;
  justify-content: flex-end;

  cursor: pointer;

  animation: ${p => (p.animateEntrances ? barAnimation : 'none')} 2s ease-in-out
    ${p => 1 + p.rightToLeftPosition * 0.2}s both;

  @media ${p => p.theme.queries.mediumAndLower} {
    align-self: flex-end;
  }

  > .bar {
    position: relative;
    right: 0;

    width: 100%;
    height: 50px;
    background: ${p => p.theme.colors[p.color]};

    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 15px;

    transition: right 0.2s;

    @media ${p => p.theme.queries.regularAndLower} {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    @media ${p => p.theme.queries.small} {
      height: 35px;
    }

    > .label {
      margin: 0 0 0 33px;

      color: ${p => p.theme.colors.light};
      font-size: 20px;

      transition: opacity 0.2s;

      @media ${p => p.theme.queries.regularAndLower} {
        margin: 0;
      }

      @media ${p => p.theme.queries.small} {
        font-size: 16px;
      }
    }

    > .icon {
      @media ${p => p.theme.queries.regularAndLower} {
        margin: 0 0 0 15px;
      }

      @media ${p => p.theme.queries.small} {
        height: 18px;
      }
    }
  }

  > .column {
    position: fixed;
    top: 0;
    right: -100vw;
    z-index: 100;

    width: calc(${p => (p.rightToLeftPosition + 1) * 60}px + 100vw);
    height: 100vh;
    background: ${p => p.theme.colors[p.color]};

    animation: ${p => (p.animateEntrances ? columnAnimation : 'none')} 1s
      ${p => p.rightToLeftPosition * 0.2}s ease-in-out both;
    transition: right 0.2s;

    @media ${p => p.theme.queries.small} {
      width: calc(${p => (p.rightToLeftPosition + 1) * 20}px + 100vw);
    }
  }

  &:hover {
    > .bar {
      right: 15px;

      @media ${p => p.theme.queries.small} {
        right: 7px;
      }

      > .label {
        opacity: 0.8;
      }
    }

    > .column {
      right: calc(-100vw + 15px);

      @media ${p => p.theme.queries.small} {
        right: calc(-100vw + 7px);
      }
    }
  }
`;
