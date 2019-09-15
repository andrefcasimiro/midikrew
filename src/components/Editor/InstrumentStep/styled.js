// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
`

export const OptionWrapper = styled.div`
  display: flex;
  height: 2rem;
  width: 2rem;
  position: absolute;
  justify-content: center;
  align-items: center;
`

export const StepWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: ${p => p.selected
    ? theme.colors.monicastro.blue
    : p.index % 4 === 0 ? theme.colors.monicastro.darkGreyLight : theme.colors.monicastro.grey};
  border-right: 1px solid ${p => p.selected ? theme.colors.monicastro.blue : theme.colors.monicastro.darkGrey};
  flex-direction: row;

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
