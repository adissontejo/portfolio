import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
  zIndex: number;
};

export const Container = styled(motion.div)<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;

  z-index: ${p => p.zIndex};

  width: 100%;
  height: 100vh;
  background: ${p => p.theme.colors[p.color]};

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  > .title-wrapper {
    padding: 64px 0 0 72px;

    width: 100%;

    display: flex;
    justify-content: flex-start;

    @media ${p => p.theme.queries.small} {
      padding: 32px 0 0;

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
