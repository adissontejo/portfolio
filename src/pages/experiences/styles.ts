import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
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
    font-size: 54px;
  }
`;

export const BackBtn = styled(motion.button)`
  position: relative;
  left: -100px;
  align-self: flex-start;

  width: 350px;
  height: 50px;
  background: ${p => p.theme.colors.light};

  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  cursor: pointer;

  transition: left 0.2s;

  > .label {
    margin: 0 33px 0 0;

    color: ${p => p.theme.colors.green};
    font-size: 20px;
  }

  &:hover {
    left: -85px;
  }
`;
