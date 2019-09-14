// @flow
import styled from 'styled-components'
import theme from 'global/theme'

export const StepIndicator = styled.div`
  height: 100%;
  flex-grow: 1;
  border-bottom: ${
    p => p.active
          ? `0.3rem solid ${theme.colors.monicastro.blue}`
          : 'none'
  };
`
