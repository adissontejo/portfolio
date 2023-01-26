import styled from 'styled-components';
import { m } from 'framer-motion';

export const Container = styled(m.div)`
  position: relative;
  margin: 10px;

  width: 416px;
  height: 234px;

  @media ${p => p.theme.queries.small} {
    width: 224px;
    height: 126px;
  }

  > .image {
    object-fit: cover;
  }
`;
