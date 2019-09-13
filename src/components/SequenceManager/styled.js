// @flow
import styled, { css } from 'styled-components'
import theme from 'global/theme'
import { BoxSection } from 'componentsStyled/Shared'
import { mq } from 'common/mediaQueries'

export const StyledBoxSection = styled(BoxSection)`
  margin-top: 1rem;
  background: none;
  padding: 2rem;
  max-height: 20rem;
  width: 100%;
  justify-content: center;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  max-width: 80rem;
`

export const LeftContainer = styled.div`
  width: 5rem;
  height: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`

export const Wrapper = styled(BoxSection)`
  flex-direction: column;
  margin-top: 0;
  background: none;
  padding: 0;
  width: 100%;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2.2rem;
  border-bottom: 1px solid ${theme.colors.monicastro.dark};

  ${mq('max').tabletWide} {
    height: 2.6rem;
  }

`

export const Instrument = styled(LeftContainer)`
  background: ${theme.colors.monicastro.dark};
  color: ${theme.colors.monicastro.white};
  width: 10rem;
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;

  ${mq('max').tabletWide} {
    width: 7rem;
  }

  ${p => p.blank && css`
    background: none;
  `}

`

export const GridWrapper = styled(RightContainer)`
  background: none;
  max-width: none;
  min-width: none;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
`
