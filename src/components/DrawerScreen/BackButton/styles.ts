import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
};

export const Container = styled(motion.div)<ContainerProps>`
  position: relative;

  margin: 45px 0 0;
  align-self: flex-start;

  width: 75%;
  min-height: 50px;
  min-width: 265px;
  max-width: 485px;

  @media ${p => p.theme.queries.small} {
    min-height: 35px;
  }

  > .button {
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.background};

    cursor: pointer;

    transition: background-color 0.8s;

    > .label-wrapper {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 15px;

      > .label {
        color: ${p =>
          p.theme.mode === 'dark'
            ? p.theme.colors.light
            : p.theme.colors[p.color]};
        font-size: 1rem;

        transition: color 0.8s;

        @media ${p => p.theme.queries.small} {
          font-size: 16px;
        }
      }

      > .icon {
        margin: 0 33px 0 0;

        color: ${p =>
          p.theme.mode === 'dark'
            ? p.theme.colors.light
            : p.theme.colors[p.color]};
        min-width: 21px;
        min-height: 21px;

        transition: color 0.8s;

        @media ${p => p.theme.queries.small} {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
`;
