// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { BoxSection } from 'componentsStyled/Shared'

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

export const Sequence = styled.div`
  width: 2rem;
  min-height: 2rem;
  margin: 0.1rem;
  height: 2rem;
  background: ${p => p.active
    ? theme.colors.monicastro.dark
    : 'none'
  };

  border: ${p => p.active
    ? 'none'
    : `1px solid ${theme.colors.monicastro.dark}`
  };

  cursor: pointer;
`

export const Button = styled.button`
  min-width: 2rem;
  height: 2rem;
  margin: 0.1rem;
  margin-right: 0.5rem;
  background: ${theme.colors.monicastro.grey};
  color: ${theme.colors.monicastro.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid;
  border-color: ${theme.colors.monicastro.dark};
  cursor: pointer;
  opacity: ${p => p.disabled ? 0.3 : 1};
`

export const Wrapper = styled(BoxSection)`
  flex-direction: column;
  margin-top: 0;
  background: none;
  padding: 0;
  width: 100%;
  justify-content: center;
`

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2.2rem;
  border-bottom: 1px solid ${theme.colors.monicastro.dark};
`

export const Instrument = styled(LeftContainer)`
  background: ${theme.colors.monicastro.dark};
  color: ${theme.colors.monicastro.white};
  width: 6rem;
  max-width: none;
  min-width: none;
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
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

export const InstrumentMenuColumn = styled(Column)`
  height: 4rem;
`

export const InstrumentMenu = styled(Instrument)`
  background: none;
  display: flex;
  margin-left: 6rem;
  flex-direction: row;
`
