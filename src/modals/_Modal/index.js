// @flow
import React, { Component, type Node } from 'react'
import {
  ModalWrapper,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalTitle,
  ModalClose,
} from './styled'

type Props = {
  children: Node,
  title: string,
  close: any,
}

type State = {
  modalRef: any,
}

class Modal extends Component <Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      modalRef: React.createRef(),
    }

    // $Ignore
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event: MouseEvent) {
    const { modalRef } = this.state

    if (!modalRef || !modalRef.current) {
      return
    }

    if (!modalRef.current.contains(event.target)) {
      this.props.close()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    return (
      <ModalWrapper>
        <ModalContainer ref={this.state.modalRef}>
          <ModalHeader>
            <ModalTitle>
              {this.props.title || ''}
            </ModalTitle>
            <ModalClose onClick={this.props.close}>
                x
            </ModalClose>
          </ModalHeader>
          <ModalContent>
            {this.props.children}
          </ModalContent>
        </ModalContainer>
      </ModalWrapper>
    )
  }
}

export default Modal
