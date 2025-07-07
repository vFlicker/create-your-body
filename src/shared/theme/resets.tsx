import { css } from '@emotion/react';

const globalResets = css`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200..800&display=swap');

  *,
  :before,
  :after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;

    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100vh;
    background-color: #f2f2f2;
  }

  body.locked {
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  code {
    font-family:
      source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input {
    border: none;
    background: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      display: none;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  input:focus {
    outline: none;
  }

  img {
    pointer-events: none;
  }

  p,
  span,
  h1,
  h2,
  h3,
  h4 {
    line-height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 150ms ease-in-out;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

export { globalResets };
