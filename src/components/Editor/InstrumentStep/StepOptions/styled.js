// @flow
import styled, { css } from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background: ${theme.colors.monicastro.grey};
  flex-direction: row;
  justify-content: space-evenly;
`

export const Option = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    padding: 0.1rem;
    margin: 1rem;
    cursor: pointer;

    width: 3rem;
    height: 3rem;

    &:hover {
      color: ${theme.colors.monicastro.blue};
    }
  }
`
