import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  > .checkbox {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  > .round-wrapper {
    position: relative;
    margin: 0 12px 0 0;

    width: 18px;
    height: 18px;
    border-radius: 100%;
    background: ${p => p.theme.colors.light};

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    cursor: pointer;

    > .border {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      width: 100%;
      height: 100%;

      border-radius: 100%;
      border: 1px solid
        ${p =>
          p.theme.mode === 'dark' ? p.theme.colors.light : p.theme.colors.dark};

      transition: border-color 0.8s;
    }

    > .round {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background: ${p => p.theme.colors.dark};

      transition: background-color 0.8s;
    }
  }

  > .label {
    position: relative;
    z-index: 1;

    color: ${p =>
      p.theme.mode === 'dark' ? p.theme.colors.light : p.theme.colors.purple};
    font-size: 0.8rem;

    transition: color 0.8s;

    cursor: pointer;

    > .mode {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      white-space: nowrap;

      &::before {
        content: 'modo ';

        visibility: hidden;
      }
    }

    &::after {
      content: 'escuro';

      visibility: hidden;
    }
  }
`;
