// @flow
import styled from 'styled-components'
import theme from 'global/theme'
import { Row } from '../Layout'

export const BoxSection = styled(Row)`
  /* Colors */
  background: ${theme.colors.monicastro.grey};
  color: ${theme.colors.monicastro.dark};

  /* Spacing */
  padding: 1rem;

  /* Flex Aligns */
  align-items: flex-start;
  justify-content: flex-start;
`

export const RoundSection = styled(Row)`
  /* Colors */
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.themes.common.white};

  /* Dimensions */
  min-height: 8rem;

  /* Spacing */
  padding: 1rem;
  margin: 1rem;

  /* Flex Aligns */
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  /* Border Effects */
  border-radius: 0.5rem;

  /* Transforms & FX */
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.4);
`

// Use TitleSection and CombinedSection to produce a full bordered radius box
export const TitleSection = styled(BoxSection)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 5rem;
  min-height: auto;
  background: none;
  color: ${theme.colors.themes.common.white};
`

export const Ul = styled.ul`
  padding: 0.5rem;
  margin-bottom: 1rem;
`

export const Li = styled.ul`
  padding: 0.5rem;
`
