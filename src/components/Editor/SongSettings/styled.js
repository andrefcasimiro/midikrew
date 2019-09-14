// @flow
import styled from 'styled-components'
import theme from 'global/theme'

export const Menu = styled.div`
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Input = styled.input`
  min-width: 2rem;
  max-width: 6rem;
  margin: 0.25rem;
  margin-right: 0.5rem;
  padding: 0.2rem;
  max-height: 2.5rem;
  background: ${theme.colors.monicastro.grey};
  color: ${theme.colors.monicastro.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid;
  border-color: ${theme.colors.monicastro.dark};
`
