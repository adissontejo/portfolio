import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
  rightToLeftPosition: number;
};

export const Container = styled(motion.div)<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;

  padding: 45px 0 0;
  z-index: ${p => (2 - p.rightToLeftPosition) * 10 + 5};

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors[p.color]};

  display: flex;
  flex-direction: column;
  align-items: center;

  > .title {
    margin: 64px 0 0 72px;
    align-self: flex-start;

    @media ${p => p.theme.queries.small} {
      margin: 42px 0 0;
      align-self: center;

      height: 55px;
    }
  }
`;

export type BackBtnProps = {
  color: keyof Theme['colors'];
};

export const BackBtn = styled(motion.button)<BackBtnProps>`
  position: relative;
  left: -15px;
  align-self: flex-start;

  height: 50px;
  background: ${p => p.theme.colors.background};

  overflow: hidden;

  cursor: pointer;

  transition: left 0.2s, background-color 0.8s;

  @media ${p => p.theme.queries.small} {
    height: 35px;
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
