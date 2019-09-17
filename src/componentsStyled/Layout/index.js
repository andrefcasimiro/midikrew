// @flow
import styled from 'styled-components'

// Just basic exports depending on flex properties. No opinionated style should go here.

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Margin = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`

export const PaddedColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`
