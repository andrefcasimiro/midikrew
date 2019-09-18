// @flow
import styled from 'styled-components'
import theme from 'global/theme'

export const StyledLi = styled.li`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0.5rem;
  margin-bottom: 0.2rem;
  padding-bottom: 2.5rem;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.monicastro.grey};
`

