// @flow
import styled, { css } from 'styled-components'
import theme from 'global/theme'
import { mq } from 'common/mediaQueries'

export const Step = styled.div`
  height: 100%;
  flex-grow: 1;
  background: ${
    p => p.active
          ? theme.colors.monicastro.blue
          : p.index % 4 === 0 ? theme.colors.monicastro.darkGreyLight : theme.colors.monicastro.grey
  };
  border-right: ${p => p.active
    ? `1px solid ${theme.colors.monicastro.blue}`
    : `1px solid ${theme.colors.monicastro.darkGrey}`
  };

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
