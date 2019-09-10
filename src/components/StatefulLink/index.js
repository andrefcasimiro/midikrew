// @flow
import React, { type Node } from 'react'
import { compose, type HOC, type Component } from 'recompose'
import {
  IoIosArrowDown as ArrowDownIcon,
  IoIosArrowUp as ArrowUpIcon,
} from 'react-icons/io'
import withOpen from 'hocs/withOpen'
import ContextMenu from 'components/ContextMenu'
import { Row } from 'componentsStyled/Layout'
import { Wrapper } from './styled'

type Props = {|
  component: Component,
  children: Node,
|}

//** A stateful link contains a child component which it shows based on the logic introduced by the withOpen hoc */
const StatefulLink = ({ isOpen, toggleOpen, component: C, children }) => {
  return (
    <React.Fragment>
      <Wrapper>
        <Wrapper onClick={toggleOpen}>
          <Row>
            {children} {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Row>
        </Wrapper>
        {isOpen &&
          <ContextMenu>
            <C />
          </ContextMenu>
        }
      </Wrapper>
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(
  withOpen,
)

export default enhancer(StatefulLink)
