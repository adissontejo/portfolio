import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Noto Sans Khmer', sans-serif;
    font-weight: 400;

    color-scheme: light;
  }

  :root {
    font-size: 20px;

    @media ${p => p.theme.queries.regularAndLower} {
      font-size: 18px;
    }

    @media ${p => p.theme.queries.small} {
      font-size: 16px;
    }
  }

  button, label {
    -webkit-tap-highlight-color: transparent;
    border: none;
    background: none;
  }
`;
