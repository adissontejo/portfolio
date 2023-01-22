import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  min-width: 1000px;

  display: flex;
  justify-content: center;
`;

export const Text = styled.p`
  padding: 0 5px;

  width: min(940px, 95vw);

  color: ${p => p.theme.colors.light};
  font-size: 1.2rem;
  text-align: center;
`;
