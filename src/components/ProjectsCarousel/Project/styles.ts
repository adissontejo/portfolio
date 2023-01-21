import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: absolute;
  top: 15px;
  left: 15px;

  width: calc(100% - 30px);
  height: calc(100% - 30px);
  object-fit: cover;

  @media ${p => p.theme.queries.small} {
    top: 5px;
    left: 5px;

    width: calc(100% - 10px);
    height: calc(100% - 10px);
  }
`;
