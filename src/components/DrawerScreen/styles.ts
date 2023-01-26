import styled from 'styled-components';
import { m } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
  rightToLeftPosition: number;
};

export const Container = styled(m.div)<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;

  z-index: ${p => (2 - p.rightToLeftPosition) * 10 + 5};

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors[p.color]};

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  will-change: transform;

  > .title-wrapper {
    margin: 64px 0 0 72px;
    align-self: flex-start;

    min-height: 71px;

    @media ${p => p.theme.queries.small} {
      margin: 50px 0 0;
      align-self: center;

      min-height: 55px;
    }

    > .title {
      height: 100%;
    }
  }
`;

export type BackBtnProps = {
  color: keyof Theme['colors'];
};

export const BackBtn = styled(m.button)<BackBtnProps>`
  position: relative;
  left: -15px;
  z-index: 20;
  align-self: flex-start;

  min-height: 50px;
  background: ${p => p.theme.colors.background};

  overflow: hidden;

  cursor: pointer;

  transition: left 0.2s, background-color 0.8s;

  @media ${p => p.theme.queries.small} {
    min-height: 35px;
  }

  > .label-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;

    > .label {
      color: ${p => p.theme.colors[p.color]};
      font-size: 1rem;

      transition: opacity 0.2s;

      @media ${p => p.theme.queries.small} {
        font-size: 16px;
      }
    }

    > .icon {
      margin: 0 33px 0 0;

      color: ${p => p.theme.colors[p.color]};
      width: 21px;
      height: 21px;

      @media ${p => p.theme.queries.small} {
        width: 18px;
        height: 18px;
      }
    }
  }

  &:hover {
    left: 0;

    > .label-wrapper {
      opacity: 0.8;
    }
  }
`;
