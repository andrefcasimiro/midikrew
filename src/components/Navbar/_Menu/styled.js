// @flow
import styled from 'styled-components'
import theme from 'global/theme'

export const Li = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${theme.colors.monicastro.blue};
  }
`
