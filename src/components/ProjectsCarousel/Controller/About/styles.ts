import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  min-width: min(100vw, 1000px);

  display: flex;
  justify-content: center;
`;

export const Text = styled.p`
  padding: 0 5px;

  width: min(95vw, 940px);

  color: ${p => p.theme.colors.light};
  font-size: 1rem;
  text-align: center;
`;
