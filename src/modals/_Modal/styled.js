// @flow
import styled, { keyframes } from 'styled-components'
import theme from 'global/theme'
// $Ignore
import { mq } from 'common/mediaQueries'

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

  cursor: auto;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 2rem;

  background: ${theme.colors.monicastro.white};
  border: none;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  overflow: auto;

  width: calc(100% - 120px);
  max-width: 550px;
  max-height: calc(100% - 80px);

  ${mq("max").tablet} {
    overflow: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    min-height: auto;
    max-height: 100%;
    min-width: auto;
    max-width: auto;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: ${theme.colors.monicastro.grey};
  border: .1rem solid rgba(255, 255, 255, 0.2);

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
  opacity: 0.8;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export const ModalContentWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  padding: 2rem;
`
