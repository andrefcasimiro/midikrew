// @flow
import React, { type Node } from 'react'
import { compose, type HOC } from 'recompose'
import {
  RelativeWrapper,
  AbsoluteWrapper,
} from './styled'

type Props = {|
  children: Node,
|}

const ContextMenu = ({ children }: Props) => {

  return (
    <React.Fragment>
      <RelativeWrapper>
        <AbsoluteWrapper>
          {children}
        </AbsoluteWrapper>
      </RelativeWrapper>
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(

)

export default enhancer(ContextMenu)
