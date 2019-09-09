// @flow
import React, { type Node } from 'react'
import type { Component, HOC } from 'recompose'
import Modal from 'modals/_Modal'
import withOpen from 'hocs/withOpen'
import { Button } from 'componentsStyled/Buttons'

type Props = {
  children: Node,
  modalComponent: Component,
  modalProps: any,
  modalTitle: string,
}

/**
 * A button that when clicked enables / disables a component wrapped inside a modal
 * @param {React.Node} children - The presentational content of the button
 * @param {Component} modalComponent - The component to be injected into the modal
 * @param {Object} modalProps - The props to be injected in the modal component
 * @param {String} modalTitle - The title of the modal
 * @param {Function} toggleOpen - Comes from withOpen, used to toggle the modal
 * @param {Boolean} isOpen - Used to know if the modal is opened or not
 */
const ModalButton = ({
  children,
  modalComponent: ModalComponent,
  modalProps,
  modalTitle,
  toggleOpen,
  isOpen,
}) => (
  <React.Fragment>
  {isOpen &&
    <Modal title={modalTitle} close={toggleOpen}>
      <ModalComponent {...modalProps} close={toggleOpen} />
    </Modal>
  }
  <Button onClick={toggleOpen}>
    {children}
  </Button>
  </React.Fragment>
)

const enhancer: HOC<*, Props> = withOpen

export default enhancer(ModalButton)
