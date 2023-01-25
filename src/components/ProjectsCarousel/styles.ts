import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .carousel-wrapper {
    position: relative;

    display: flex;
    justify-content: center;
  }
`;

export const Carousel = styled.div`
  position: relative;

  width: 100vw;
  max-width: 2180px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  > .scene {
    position: relative;

    width: 436px;
    height: 254px;
    display: flex;

    @media ${p => p.theme.queries.small} {
      width: 244px;
      height: 146px;
    }

    > .border {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;

      width: 100%;
      height: 100%;
    }

    .carousel {
      display: flex;
    }
  }
`;

export type OpacityFilterProps = {
  type: 'left' | 'right';
};

export const OpacityFilter = styled.div<OpacityFilterProps>`
  position: relative;
  z-index: 1000;
  ${p => p.type}: 440px;

  background: linear-gradient(
    to ${p => p.type},
    rgba(50, 116, 109, 0),
    rgba(50, 116, 109, 0.1),
    rgba(50, 116, 109, 0.2),
    rgba(50, 116, 109, 0.3),
    rgba(50, 116, 109, 0.4),
    rgba(50, 116, 109, 0.5),
    rgba(50, 116, 109, 0.6),
    rgba(50, 116, 109, 0.7),
    rgba(50, 116, 109, 0.8),
    rgba(50, 116, 109, 0.9),
    rgba(50, 116, 109, 1),
    rgba(50, 116, 109, 1),
    rgba(50, 116, 109, 1),
    rgba(50, 116, 109, 1),
    rgba(50, 116, 109, 1)
  );

  @media (min-width: 2140px) {
    width: 450px;
    height: 254px;
  }
`;
