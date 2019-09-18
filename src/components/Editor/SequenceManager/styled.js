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
  align-items: ${p => p.align || 'center'};
  max-width: 80rem;
`

export const SongTools = styled(MainContainer)`
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: none;
  flex-direction: row;
  padding: 1rem;
  margin-bottom: 0;
  padding-bottom: 0;
`

export const TopContainer = styled.div`
  width: 5rem;
  height: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const BottomContainer = styled.div`
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

export const Instrument = styled(TopContainer)`
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
    width: 10rem;
    font-size: 1.2rem;
  }

  ${p => p.blank && css`
    background: none;
  `}

  p {
    font-size: 1.4rem;
    color: ${theme.colors.monicastro.white};
    width: 7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${mq('max').tabletWide} {
      font-size: 1rem;
      width: 5rem;
    }
  }
`

export const GridWrapper = styled(BottomContainer)`
  background: none;
  max-width: none;
  min-width: none;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
`

export const StyledStatefulLink = styled.span`
  p {
    margin: 0;
  }

  background: ${theme.colors.monicastro.grey};
  border-radius: 0.25rem;
  color: ${theme.colors.monicastro.dark};
  cursor: pointer;

  margin-left: 0.5rem;
  margin-right: 0.5rem;

  ${mq('max').tabletWide} {
    margin: 1rem 0;
    padding: 1rem;

    width: 100%;

   &:first-child {
      justify-content: center;
    }
  }
`
