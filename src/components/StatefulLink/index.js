// @flow
import React, { type Node } from 'react'
import { compose, type HOC, type Component, lifecycle } from 'recompose'
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
  data?: Object,
|}

/**
 * Used to handle a set of sub-links (similar to a context menu or a link with children links)
 * @param {Component} component- The component that is rendered and wrapped inside the conditional Context Menu
 * @param {React.Node} children - Most likely the name of the option to be displayed
 * @param {Object} data - Optional parameter to watch. If it changes, we close all previous open stateful links (if user logs in, for example) 
 */
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
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) {
        this.props.close()
      }
    }
  })
)

export default enhancer(StatefulLink)
