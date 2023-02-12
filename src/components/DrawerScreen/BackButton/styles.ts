import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  background: keyof Theme['colors'];
  color: keyof Theme['colors'];
};

export const Container = styled(motion.div)<ContainerProps>`
  position: relative;
  left: -50px;
  margin: 45px 0;
  align-self: flex-start;

  min-height: 50px;

  display: flex;
  justify-content: flex-end;
  overflow: hidden;

  @media ${p => p.theme.queries.small} {
    min-height: 35px;
  }

  > .button {
    width: 80vw;
    height: 100%;
    min-width: 290px;
    max-width: 520px;
    background: ${p => p.theme.colors[p.background]};

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;

    cursor: pointer;

    transition: background-color 0.8s;

    > .label {
      color: ${p =>
        p.theme.mode === 'dark' || p.background !== 'background'
          ? p.theme.colors.light
          : p.theme.colors[p.color]};
      font-size: 1rem;

      transition: color 0.8s;
    }

    > .icon {
      margin: 0 33px 0 0;

      min-width: 21px;
      min-height: 21px;

      color: ${p =>
        p.theme.mode === 'dark' || p.background !== 'background'
          ? p.theme.colors.light
          : p.theme.colors[p.color]};

      transition: color 0.8s;

      @media ${p => p.theme.queries.small} {
        min-width: 18px;
        min-height: 18px;
      }
    }
  }
`;
