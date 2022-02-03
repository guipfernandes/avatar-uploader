import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Inter, Roboto, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
    background-color: white;
    overflow: hidden;
  }
`;

export default GlobalStyles;