import styled from 'styled-components';
import { m } from 'framer-motion';

export const Container = styled(m.h2)`
  padding: 0 5px;

  min-width: 450px;

  color: ${p => p.theme.colors.light};
  font-size: 1.2rem;
  text-align: center;

  @media ${p => p.theme.queries.small} {
    min-width: min(238px, calc(100% - 120px));
  }
`;
