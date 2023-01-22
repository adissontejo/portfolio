import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  margin: 25px 0 0;

  width: 100vw;

  display: flex;
  align-items: center;

  > .arrow-wrapper {
    flex: 1;

    min-width: 60px;
  }
`;

export const NamesContainer = styled.div`
  position: relative;
  z-index: -1;

  width: 450px;

  @media ${p => p.theme.queries.small} {
    width: min(238px, calc(100vw - 120px));
  }

  > .names-wrapper {
    width: auto;

    display: flex;
    gap: 550px;

    @media ${p => p.theme.queries.small} {
      gap: max(762px, calc(1120px - 100vw));
    }
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

export const AboutContainer = styled.div`
  position: relative;
  margin: 50px 0 0;

  width: 1000px;

  overflow: hidden;

  > .about-wrapper {
    display: flex;

    width: auto;
  }
`;

export type OpacityFilterProps = {
  type: 'left' | 'right';
};

export const OpacityFilter = styled.div<OpacityFilterProps>`
  position: absolute;
  top: 0;
  ${p => p.type}: 0;
  z-index: 10;

  width: 30px;
  height: 100%;
  background: linear-gradient(
    to ${p => p.type},
    rgba(50, 116, 109, 0),
    rgba(50, 116, 109, 1)
  );
`;
