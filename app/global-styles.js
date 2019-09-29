import { createGlobalStyle } from 'styled-components';

// TODO: switch to scss

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    /* background-color: #fafafa; */
    min-height: 100%;
    width: 80%;
    margin: 2rem auto;
  }

  p,
  label {
    font-family: sans;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
