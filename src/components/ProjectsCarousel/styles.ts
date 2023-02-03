import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  > .carousel-wrapper {
    position: relative;

    width: 3052px;

    display: flex;
    justify-content: center;
  }
`;

export const Carousel = styled.div`
  width: 100%;
  max-width: 2180px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  > .scene {
    position: relative;

    > .border {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;

      width: 100%;
      height: 100%;

      pointer-events: none;
      touch-action: none;

      * {
        stroke: ${p => p.theme.colors.light};
        stroke-width: 1px;
      }
    }

    > div > .carousel {
      width: 436px;
      height: 254px;

      display: flex;

      touch-action: none;
      cursor: grab;

      @media ${p => p.theme.queries.small} {
        width: 244px;
        height: 146px;
      }
    }
  }
`;

export type OpacityFilterProps = {
  type: 'left' | 'right';
};

export const OpacityFilter = styled.div<OpacityFilterProps>`
  position: relative;
  z-index: 1000;
  ${p => p.type}: 420px;

  background: linear-gradient(
    to ${p => p.type},
    rgba(50, 116, 109, 0),
    rgba(50, 116, 109, 0.5),
    rgba(50, 116, 109, 0.8),
    rgba(50, 116, 109, 1),
    rgba(50, 116, 109, 1)
  );

  pointer-events: none;
  touch-action: none;

  @media (min-width: 2140px) {
    width: 436px;
    height: 254px;
  }
`;
