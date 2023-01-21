import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  > .carousel {
    position: relative;
    perspective: 1000px;

    width: 446px;
    height: 312px;
    border: 1px solid ${p => p.theme.colors.light};

    @media ${p => p.theme.queries.small} {
      width: 234px;
      height: 178px;
    }

    > .scene {
      position: absolute;

      width: 100%;
      height: 100%;

      transform-style: preserve-3d;
    }
  }
`;

export const Controller = styled.div`
  margin: 25px 0 0;

  width: 100vw;

  display: flex;
  justify-content: space-between;

  > .project-name {
    width: 450px;

    color: ${p => p.theme.colors.light};
    font-size: 1.8rem;
    text-align: center;

    @media ${p => p.theme.queries.small} {
      width: 238px;
    }
  }

  > .arrow-wrapper {
    flex: 1;

    min-width: 50px;
  }
`;

const arrowsAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: max(50px, 100%);
  }
`;

export const ArrowButton = styled.button`
  height: 50px;

  background: ${p => p.theme.colors.light};

  display: flex;
  align-items: center;

  cursor: pointer;

  animation: ${arrowsAnimation} 1s ease-in-out 1.5s both;

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
  }

  &:hover {
    > .icon {
      opacity: 0.8;
    }
  }
`;
