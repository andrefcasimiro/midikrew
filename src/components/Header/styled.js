// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { BoxSection } from 'componentsStyled/Shared'

export const Container = styled(BoxSection)`
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  margin: 0;
  top: 0;
  z-index: ${theme.zIndices.navbar};
  max-height: 2.6rem;
  min-height: auto;
  padding: 1rem;
`

// Offsets the content below the header
export const Spacer = styled.div`
  height: 2.6rem;
  background: none;
`
