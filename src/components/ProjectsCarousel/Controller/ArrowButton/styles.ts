import styled from 'styled-components';

export type ContainerProps = {
  arrowType: 'back' | 'forward';
};

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  ${p => (p.arrowType === 'back' ? 'left' : 'right')}: 0;

  width: calc(50% - 225px);
  height: 50px;

  display: flex;
  justify-content: flex-${p => (p.arrowType === 'back' ? 'start' : 'end')};

  @media ${p => p.theme.queries.small} {
    width: max(60px, calc(50% - 119px));
    height: 35px;
  }

  > .bar {
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.light};

    display: flex;
    align-items: center;
    justify-content: flex-${p => (p.arrowType === 'back' ? 'end' : 'start')};
    overflow: hidden;

    cursor: pointer;

    > .icon {
      margin: ${p => (p.arrowType === 'back' ? '0 15px 0 0' : '0 0 0 15px')};

      min-width: 21px;
      min-height: 21px;

      color: ${p => p.theme.colors.green};

      transition: opacity 0.2s;

      @media ${p => p.theme.queries.small} {
        min-width: 18px;
        min-height: 18px;
      }
    }

    &:hover {
      > .icon {
        opacity: 0.6;
      }
    }
  }
`;
