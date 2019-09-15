// @flow
import styled, { css } from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const StepWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  background: ${p => p.index % 4 === 0 ? theme.colors.monicastro.darkGreyLight : theme.colors.monicastro.grey};
  border-right: 1px solid ${theme.colors.monicastro.darkGrey};
  flex-direction: row;
`

export const Selected = styled.div`
  height: 100%;
  background: ${theme.colors.monicastro.blue};
  border-right: 1px solid ${theme.colors.monicastro.blue};

  ${mq('min').tabletWide} {
    &:hover {
      background: ${theme.colors.monicastro.blue};
      cursor: pointer;
      opacity: 0.5;
    }
    &:active {
      opacity: 1;
    }
  }
`
