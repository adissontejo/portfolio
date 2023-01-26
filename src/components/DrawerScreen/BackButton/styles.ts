import styled from 'styled-components';

import { Theme } from '~/styles';

export type ContainerProps = {
  color: keyof Theme['colors'];
};

export const Container = styled.button<ContainerProps>`
  position: relative;
  margin: 45px 0 0;
  align-self: flex-start;

  width: 75%;
  min-height: 50px;
  min-width: 265px;
  max-width: 485px;

  overflow: hidden;

  cursor: pointer;

  transform: translateX(-15px);

  transition: transform 0.2s;

  @media ${p => p.theme.queries.small} {
    min-height: 35px;
  }

  > .bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.background};

    transition: background-color 0.8s;
  }

  > .label-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;

    > .label {
      color: ${p => p.theme.colors[p.color]};
      font-size: 1rem;

      transition: opacity 0.2s;

      @media ${p => p.theme.queries.small} {
        font-size: 16px;
      }
    }

    > .icon {
      margin: 0 33px 0 0;

      color: ${p => p.theme.colors[p.color]};
      width: 21px;
      height: 21px;

      @media ${p => p.theme.queries.small} {
        width: 18px;
        height: 18px;
      }
    }
  }

  &:hover {
    transform: translateX(0);

    > .label-wrapper {
      opacity: 0.8;
    }
  }
`;
