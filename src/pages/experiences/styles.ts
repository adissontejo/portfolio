import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;

  padding: 68px 0 0;
  z-index: 15;

  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.colors.green};

  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    color: ${p => p.theme.colors.light};
    font-size: 40px;
  }
`;

export const BackBtn = styled(motion.button)`
  position: relative;
  left: -90px;
  align-self: flex-start;

  width: 330px;
  height: 50px;
  background: ${p => p.theme.colors.background};

  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  cursor: pointer;

  transition: left 0.2s, background-color 0.8s;

  @media ${p => p.theme.queries.mediumAndLower} {
    height: 35px;
  }

  > .label {
    margin: 0 33px 0 0;

    color: ${p => p.theme.colors.green};
    font-size: 20px;

    transition: opacity 0.2s;

    @media ${p => p.theme.queries.mediumAndLower} {
      font-size: 16px;
    }
  }

  &:hover {
    left: -75px;

    > .label {
      opacity: 0.8;
    }
  }
`;
