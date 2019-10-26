// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers } from 'recompose'
import withKey from 'hocs/withKey'
import TRACK_ACTIONS from 'data/track/actions'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import {
  Wrapper,
} from './styled'

type Props = {
  id: number, // The sequence index in the sequence list
}

const Sequence = ({ id, currentSequence, handleClick }) => (
  <Wrapper onClick={() => handleClick(id)} active={id === currentSequence}>
    {id + 1}
  </Wrapper>
)

const mapStateToProps = state => ({
  currentSequence: state.track.currentSequence,
  sequences: state.track.sequences,
})

const mapDispatchToProps = {
  setCurrentSequence: TRACK_ACTIONS.setCurrentSequence,
  addSequence: TRACK_ACTIONS.addSequence,
  copySequence: INSTRUMENT_ACTIONS.copySequence,
  pasteSequence: INSTRUMENT_ACTIONS.pasteSequence,
}

const enhancer: HOC<*, Props> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withKey(16),
  withHandlers({
    handleClick: props => id => {
      // Copy and Paste sequences shortcut
      if (props.isPressed) {
        const source = props.currentSequence
        const target = props.id
        let numberOfSequences = props.sequences.length

        if (target > source) {
          for (let i = source; i <= target; i++) {
            props.addSequence()

            // Copy each instrument notes on this sequence
            props.copySequence(i)


            // Paste to the sequence
            props.pasteSequence(numberOfSequences)

            numberOfSequences++;
          }
        } else {
          for (let j = source; j >= target; j--) {
            props.addSequence()

            // Copy each instrument notes on this sequence
            props.copySequence(source - j)


            // Paste to the sequence
            props.pasteSequence(numberOfSequences)

            numberOfSequences++;
          }
        }
      }

      if (props.currentSequence !== id) {
        return props.setCurrentSequence(id)
      }
    },
  })
)

export default enhancer(Sequence)
