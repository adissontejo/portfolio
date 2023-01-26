import styled from 'styled-components';
import { m } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  gridArea: string;
  color: keyof Theme['colors'];
  rightToLeftPosition: number;
};

export const Container = styled(m.button)<ContainerProps>`
  grid-area: ${p => p.gridArea};
  z-index: ${p => (2 - p.rightToLeftPosition) * 10};
  position: relative;

  width: 100%;

  display: flex;
  justify-self: flex-end;
  justify-content: flex-end;

  cursor: pointer;

  @media ${p => p.theme.queries.regularAndLower} {
    align-self: flex-end;
  }

  > .bar {
    width: 100%;
    height: 50px;
    background: ${p => p.theme.colors[p.color]};

    display: flex;
    align-items: center;
    overflow: hidden;

    will-change: transform;

    @media ${p => p.theme.queries.small} {
      height: 35px;
    }

    > .label-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;

      @media ${p => p.theme.queries.regularAndLower} {
        flex-direction: row-reverse;
        justify-content: flex-end;
      }

      > .label {
        margin: 0 0 0 33px;

        color: ${p => p.theme.colors.light};
        font-size: 1rem;

        transition: opacity 0.2s;

        @media ${p => p.theme.queries.regularAndLower} {
          margin: 0;
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
  }

  > .column {
    position: fixed;
    top: 0;
    right: -100vw;
    z-index: 100;

    width: calc(${p => (p.rightToLeftPosition + 1) * 60}px + 100vw);
    height: 100vh;
    background: ${p => p.theme.colors[p.color]};

    will-change: transform;

    @media ${p => p.theme.queries.small} {
      width: calc(${p => (p.rightToLeftPosition + 1) * 20}px + 100vw);
    }
  }
`;
