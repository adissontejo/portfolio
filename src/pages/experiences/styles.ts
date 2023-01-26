import styled from 'styled-components';

import { DrawerScreen } from '~/components';

export const Container = styled(DrawerScreen)``;

export const Section = styled.section`
  margin: 54px 0 0;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > .subtitle {
    margin: 0 0 29px;

    color: ${p => p.theme.colors.light};
    font-size: 1rem;
  }

  > .experience {
    position: relative;
    margin: 0 0 200px;

    align-self: flex-start;

    width: 480px;
    min-width: 50%;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    > .bar {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      width: 100%;
      height: 100%;
      background: ${p => p.theme.colors.light};
    }

    > .label {
      margin: 10px 72px 10px 0;

      color: ${p => p.theme.colors.green};
      font-size: 1rem;
      text-align: end;

      @media (max-width: 480px) {
        margin: 10px 5px;
        align-self: center;
      }
    }
  }
`;
