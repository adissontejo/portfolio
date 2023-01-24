import styled from 'styled-components';

export type ContainerProps = {
  arrowType: 'back' | 'forward';
};

export const Container = styled.button<ContainerProps>`
  position: relative;

  flex: 1;
  min-width: 60px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-${p => (p.arrowType === 'back' ? 'end' : 'start')};
  overflow: hidden;

  cursor: pointer;

  @media ${p => p.theme.queries.small} {
    height: 35px;
  }

  > .bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.light};
  }

  > .icon {
    margin: ${p => (p.arrowType === 'back' ? '0 15px 0 0' : '0 0 0 15px')};

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
