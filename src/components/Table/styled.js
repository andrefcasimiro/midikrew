// @flow
import styled from 'styled-components'
import { Button } from 'componentsStyled/Buttons'

export const ComponentWrapper = styled(Button)`
  height: auto;
  padding: 0;
  margin: 0;
  margin-right: 1rem;
  opacity: 0.3;

  border: 0.1rem solid rgba(255, 255, 255, 0.1);

  * {
    margin-right: 0;
  }

  &::before {
    display: none;
  }

  &::after {
    width: 6rem;
    filter: blur(20px);
  }

  &::hover {
    opacity: 1;
  }
`
