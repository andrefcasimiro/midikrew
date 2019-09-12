// @flow
import styled, { css } from 'styled-components'
import theme from 'global/theme'

export const Button = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: ${theme.colors.monicastro.dark};
  border: 0.1rem solid ${theme.colors.monicastro.darkGrey};

  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;

  height: 3.2rem;
  min-width: 5rem;

  text-align: center;

  position: relative;
  overflow: hidden;
  user-select: none;

  transition: .25s ease;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  * {
    margin-right: 0.5rem;
  }
`

export const Submit = styled(Button)`
  margin-top: 2rem;
  width: 100%;
  min-height: 5rem;

  ${p => p.disabled && css`
    opacity: 0.1;
  `};

  &:hover {
    ${p => p.disabled && css`
      opacity: 0.1;
    `};
  }

  font-size: 1.4rem;
`
