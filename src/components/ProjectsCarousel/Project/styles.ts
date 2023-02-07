import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  padding: 10px;

  min-width: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  > .image-wrapper {
    position: relative;

    width: 100%;
    height: 100%;
    background: red;

    touch-action: none;

    > .image {
      object-fit: cover;
    }
  }
`;
