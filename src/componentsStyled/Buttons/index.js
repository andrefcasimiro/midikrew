// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import effect from './effect'

export const Button = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: ${theme.colors.themes.common.white};
  border: 0.1rem solid rgba(255, 255, 255, 0.5);

  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;

  height: 3.2rem;
  min-width: 5rem;

  padding: 0 1rem;

  text-align: center;

  position: relative;
  overflow: hidden;
  user-select: none;

  transition: .25s ease;
  cursor: pointer;
  opacity: 0.6;

  ${effect};

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
`
