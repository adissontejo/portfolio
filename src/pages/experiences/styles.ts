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
    min-width: 50vw;
    max-width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    > .bar {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;

      width: 100%;
      height: 100%;
      background: ${p => p.theme.colors.light};
    }

    > .label {
      position: relative;
      z-index: 1;
      margin: 19px 72px 19px 0;

      color: ${p => p.theme.colors.green};
      font-size: 1rem;
      text-align: center;

      @media (max-width: 480px) {
        margin: 19px 5px;
        align-self: center;
      }
    }
  }
`;
