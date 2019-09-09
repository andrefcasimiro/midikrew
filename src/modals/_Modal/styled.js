// @flow
import styled, { keyframes } from 'styled-components'
import theme from 'global/theme'

const modalFadeDuration = 250

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

export const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  position: fixed;

  z-index: ${theme.zIndices.modal};

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  padding: 0;
  top: 0;
  left: 0;

  animation: ${fadeIn} ${modalFadeDuration}ms ease;
  backdrop-filter: blur(5px);
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 2rem;

  background: ${theme.colors.themes.common.primary};
  border: .1rem solid rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 15px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  overflow: auto;

  width: calc(100% - 120px);
  min-height: calc(100% - 300px);
  max-width: 550px;
  max-height: calc(100% - 80px);
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;

  background: ${theme.colors.themes.common.primary};
  border: .1rem solid rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 15px 10px rgba(0, 0, 0, 0.1);

  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  width: 100%;
  max-height: 6rem;
`

export const ModalTitle = styled.h2`
  font-weight: normal;
`

export const ModalClose = styled.div`
  background: ${theme.colors.themes.hippocampus.red};

  display: flex;
  align-self: center;
  justify-content: center;

  position: relative;
  color: white;
  padding: 0.25rem;
  text-align: center;
  width: 2.5rem;
  font-size: 1.8rem;

  transition: 0.2s all;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`

export const ModalContent = styled.div`
  margin-top: 1rem;
  padding: 1rem;
`
