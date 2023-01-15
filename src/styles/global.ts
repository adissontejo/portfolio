import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Noto Sans Khmer', sans-serif;
    font-weight: 400;
  }

  button {
    border: none;
    background: none;
  }
`;