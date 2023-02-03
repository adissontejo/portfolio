import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: relative;
  z-index: 1;

  > .selector {
    display: flex;
    align-items: center;
    gap: 12px;

    cursor: pointer;

    > .round-wrapper {
      position: relative;

      width: 18px;
      height: 18px;
      border-radius: 100%;
      background: ${p => p.theme.colors.light};

      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      > .border {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        width: 100%;
        height: 100%;

        border-radius: 100%;
        border: 1px solid
          ${p =>
            p.theme.mode === 'dark'
              ? p.theme.colors.light
              : p.theme.colors.dark};

        transition: border-color 0.8s;
      }

      > .round {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: ${p => p.theme.colors.dark};

        transition: background-color 0.8s;
      }
    }

    > .label {
      color: ${p =>
        p.theme.mode === 'dark' ? p.theme.colors.light : p.theme.colors.purple};
      font-size: 0.8rem;

      transition: color 0.8s;

      > .value {
        position: absolute;

        visibility: hidden;
      }

      &::after {
        content: 'escuro';

        visibility: hidden;
      }
    }
  }
`;

export const Float = styled.span`
  position: absolute;
  top: 0;
  left: 30px;
  z-index: -1;

  color: ${p =>
    p.theme.mode === 'dark' ? p.theme.colors.light : p.theme.colors.purple};
  font-size: 0.8rem;

  transition: color 0.8s;

  &::before {
    content: 'modo';

    visibility: hidden;
  }

  > span {
    position: absolute;
    left: 100%;
  }

  .light::before {
    content: 'claro';
  }

  .dark::before {
    content: 'escuro';
  }
`;
