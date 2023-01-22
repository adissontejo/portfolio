import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;

  width: 416px;
  height: 234px;
  object-fit: cover;

  @media ${p => p.theme.queries.small} {
    width: 224px;
    height: 126px;
  }

  > .image {
    object-fit: cover;
  }
`;
