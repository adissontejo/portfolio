import styled from 'styled-components';
import { m } from 'framer-motion';

export const Container = styled(m.div)`
  min-width: 1000px;

  display: flex;
  justify-content: center;
`;

export const Text = styled.p`
  padding: 0 5px;

  width: min(940px, 95%);

  color: ${p => p.theme.colors.light};
  font-size: 1rem;
  text-align: center;
`;
