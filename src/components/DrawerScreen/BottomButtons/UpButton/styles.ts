import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 5vw;
  z-index: 100;

  overflow: hidden;

  > .wrapper {
    position: relative;
    bottom: -100px;

    > .button {
      width: 50px;
      height: 300px;
      background: ${p => p.theme.colors.light};

      display: flex;
      flex-direction: column;
      align-items: center;

      cursor: pointer;

      @media ${p => p.theme.queries.small} {
        width: 35px;
        height: 240px;
      }

      > .icon {
        margin: 15px 0 0;

        width: 21px;
        height: 21px;
        color: ${p => p.theme.colors.green};

        transform: rotate(-90deg);

        @media ${p => p.theme.queries.small} {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
`;
