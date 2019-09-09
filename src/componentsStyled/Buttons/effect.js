// @flow
import { css } from "styled-components"

export default css`
  &::before {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 6rem;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
    filter: blur(3rem);
    transform: translateX(-10rem) skewX(-15deg);
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 3rem;
    height: 100%;
    left: 3rem;
    top: 0;
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateX(-10rem) skewX(-15deg);
  }

  &:hover {
    &::before {
      transform: translateX(20rem) skewX(-15deg);
      opacity: 0.6;
      transition: 0.7s;
    }

    &::after {
      transform: translateX(5.5rem) skewX(-15deg);
      opacity: 1;
      transition: 0.7s;
    }
  }
`
