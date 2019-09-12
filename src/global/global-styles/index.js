// @flow
import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import theme from 'global/theme'

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize};

  html {
    font-size: 62.5%;
  }

  *, *::after, *::before {
    /* Include padding and border in the element's total width and height: */
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-size: 1.6rem;
    color: ${theme.colors.monicastro.darkGrey};
    background: ${theme.colors.monicastro.white};

    &, button, input, option, select, textarea {
      font-family: 'Arial', sans-serif;
    }

    &.fontLoaded {
      &, button, input, option, select, textarea {
        font-family: 'defaultFont', 'Arial', sans-serif;
      }
    }

    .overflowHidden {
      overflow: hidden;
      position: fixed;
    }
  }

  button {
    background: none;
    padding: 0;
    outline: none;
    border: none;
  }

  ul {
    padding: 0;
    list-styled: none;
    font-size: 1.4rem;
  }

  h1, h2, h3, h4, h5, p {
    color: ${theme.colors.monicastro.dark};
    letter-spacing: 0.1rem;
  }
`

export default GlobalStyle
