// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, type HOC } from 'recompose'
import ACTIONS from 'data/track/actions'
import {
  Wrapper,
} from './styled'

type Props = {
  id: number, // The sequence index in the sequence list
}

const Sequence = ({ id, currentSequence, setCurrentSequence }) => {

  return (
    <Wrapper onClick={id !== currentSequence ? () => setCurrentSequence(id) : null} active={id === currentSequence}>
      {id + 1}
    </Wrapper>
  )
}

const mapStateToProps = state => {

  return {
    currentSequence: state.track.currentSequence,
  }
}

const mapDispatchToProps = {
  setCurrentSequence: ACTIONS.setCurrentSequence,
}

const enhancer: HOC<*, Props> = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhancer(Sequence)
