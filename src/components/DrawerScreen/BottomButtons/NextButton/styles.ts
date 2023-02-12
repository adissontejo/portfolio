import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
};

export const Container = styled(motion.div)<ContainerProps>`
  margin: 0 0 50px;

  width: 100%;
  height: 50px;

  display: flex;
  justify-content: flex-end;

  @media ${p => p.theme.queries.small} {
    margin: 0 0 35px;

    height: 35px;
  }

  > .wrapper {
    position: relative;
    right: -50px;
    z-index: 200;

    overflow: hidden;

    > .button {
      width: 80vw;
      height: 50px;
      min-width: 290px;
      max-width: 520px;
      background: ${p => p.theme.colors[p.color]};

      display: flex;
      align-items: center;
      gap: 15px;

      cursor: pointer;

      @media ${p => p.theme.queries.small} {
        height: 35px;
      }

      > .icon {
        margin: 0 0 0 33px;

        color: ${p => p.theme.colors.light};
        width: 21px;
        height: 21px;

        @media ${p => p.theme.queries.small} {
          width: 18px;
          height: 18px;
        }
      }

      > .label {
        color: ${p => p.theme.colors.light};
        font-size: 1rem;
      }
    }
  }
`;
