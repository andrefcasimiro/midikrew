// @flow
import React, { type Node } from 'react'
import { compose, type HOC, type Component } from 'recompose'
import withOpen from 'hocs/withOpen'
import Modal from 'modals/_Modal'
import { Row } from 'componentsStyled/Layout'
import { Wrapper } from './styled'

type Props = {|
  component: Component,
  children: Node,
  title: string,
|}

//** A link dispatcher that handles its own modal state and renders it accordingly */
const StatefulModal = ({ isOpen, toggleOpen, component: C, children, title }) => {
  return (
    <React.Fragment>
      <Wrapper>
        <Wrapper onClick={toggleOpen}>
          <Row>
            {children}
          </Row>
        </Wrapper>
        {isOpen &&
          <Modal title={title} close={toggleOpen}>
            <C />
          </Modal>
        }
      </Wrapper>
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(
  withOpen,
)

export default enhancer(StatefulModal)
