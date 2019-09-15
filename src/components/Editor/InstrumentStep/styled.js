// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
  width: auto;
  position: relative;
`

export const OptionWrapper = styled.div`
  position: absolute;
  right: 0;
  padding-top: 0;
  background: ${theme.colors.monicastro.dark};

  display: flex;
  width: auto;
  height: 40%;
  flex-direction: column;

  ${mq('max').phoneWide} {
    width: 100%;
  }

  ${mq('min').tabletWide} {
    width: 20%;
    padding-top: 0.2rem;
    height: 100%;
    opacity: 0;
    transition: 0.2s opacity ease;

    &:hover {
      opacity: 1;
    }
  }
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
