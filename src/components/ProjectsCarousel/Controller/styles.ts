import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > .arrow-wrapper {
    position: relative;
    z-index: 10;
    margin: 25px 0 0;

    min-width: 100%;
  }
`;

export const TextsContainer = styled(motion.div)`
  overflow: hidden;

  > .texts-wrapper > .carousel {
    width: min(100vw, 1000px);

    display: flex;
  }
`;
