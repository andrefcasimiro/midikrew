// @flow
import styled from 'styled-components'
import { Button } from 'componentsStyled/Buttons'
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
  border-bottom: 0.2rem solid rgba(255, 255, 255, 0.3);
  box-shadow: none;
`

export const GlassWrapper = styled(Button)`
  margin: 0;
  height: 6rem;
  border-top: none;
  border-bottom: none;
  opacity: 1;
  background: none;

  &:hover {
    &::before {
    }

    &::after {
      display: none;

    }
  }
`
