import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  padding: 68px 0 0;
  z-index: 99;

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
