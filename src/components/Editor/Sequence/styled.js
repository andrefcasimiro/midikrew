// @flow
import styled from 'styled-components'
import theme from 'global/theme'

export const Wrapper = styled.div`
  display: flex;
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

  color: ${p => p.active ? theme.colors.monicastro.white : theme.colors.monicastro.dark };
  align-items: center;
  justify-content: center;

  cursor: pointer;
`
