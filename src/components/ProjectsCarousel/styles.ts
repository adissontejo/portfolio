import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
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

    @media ${p => p.theme.queries.small} {
      width: 244px;
      height: 146px;
    }

    > .carousel {
      position: absolute;

      width: 100%;
      height: 100%;
    }

    > .border {
      position: relative;
      z-index: 1;

      width: 100%;
      height: 100%;
      border: 1px solid ${p => p.theme.colors.light};
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

export const Controller = styled.div`
  margin: 25px 0 0;

  width: 100vw;

  display: flex;
  align-items: center;

  > .project-name {
    width: 450px;

    color: ${p => p.theme.colors.light};
    font-size: 1.2rem;
    text-align: center;

    @media ${p => p.theme.queries.small} {
      width: 238px;
    }
  }

  > .arrow-wrapper {
    flex: 1;

    min-width: 60px;
  }
`;

export const ArrowButton = styled(motion.button)`
  height: 50px;

  background: ${p => p.theme.colors.light};

  display: flex;
  align-items: center;
  overflow: hidden;

  cursor: pointer;

  @media ${p => p.theme.queries.small} {
    height: 35px;
  }

  &.back {
    justify-content: flex-end;

    > .icon {
      margin: 0 15px 0 0;
    }
  }

  &.forward {
    margin: 0 0 0 auto;

    > .icon {
      margin: 0 0 0 15px;
    }
  }

  > .icon {
    width: 21px;
    height: 21px;

    color: ${p => p.theme.colors.green};

    transition: opacity 0.2s;

    @media ${p => p.theme.queries.small} {
      width: 18px;
      height: 18px;
    }
  }

  &:hover {
    > .icon {
      opacity: 0.6;
    }
  }
`;
