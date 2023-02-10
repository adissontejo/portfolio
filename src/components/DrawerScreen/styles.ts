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

  z-index: ${p => (2 - p.rightToLeftPosition) * 10 + 5};

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors[p.color]};

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  > .title-wrapper {
    margin: 64px 0 0 72px;

    width: 100%;

    display: flex;
    justify-content: flex-start;

    @media ${p => p.theme.queries.small} {
      margin: 50px 0 0;

      justify-content: center;
    }

    > .title {
      max-width: calc(100% - 20px);
    }
  }
`;

export type BackBtnProps = {
  color: keyof Theme['colors'];
};
