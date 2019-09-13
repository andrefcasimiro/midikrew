// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const RelativeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`

export const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  left: -1.2rem;
  width: 10rem;
  min-height: 4rem;
  overflow-y: auto;
  background: ${theme.colors.monicastro.white};
  border-left: 1px solid ${theme.colors.monicastro.grey};
  padding: 0.5rem;
  font-size: 1.1rem;

  * li {
    margin-bottom: 1.5rem;
  }

  ${mq('min').tablet} {
    font-size: 1.4rem;
    min-width: 10rem;
    left: -2.6rem;
  }

  ${mq('min').tabletWide} {
    min-width: 16rem;
    left: -4rem;
  }

  border: 1px solid ${theme.colors.monicastro.darkGreyLight};
`
