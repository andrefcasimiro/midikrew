// @flow
import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers } from 'recompose'
import SamplePlayer from 'components/SamplePlayer'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import {
  Step,
} from './styled'


const generator = []
for (let i = 0; i < 16; i++) {
  generator.push(i)
}

const Grid = ({
  handleSelection,
  instruments, // from redux track tree
  instrumentOwner, // from parent component
  currentStep,
  currentSequence,
  sample,
  audioContext, // from redux track tree
  isPlaying, // from redux track tree
}) => {
  let sequence = instruments.find(i => i.id === instrumentOwner)
  sequence = sequence.sequences && sequence.sequences[currentSequence]

  return (
    <React.Fragment>
      {generator.map(index => {
        const active = sequence && sequence.includes(index)
        const trigger = isPlaying && index === currentStep && sequence && sequence.includes(index)

        return (
          <Step active={active} key={index} index={index} onClick={() => handleSelection(index)}>
            <SamplePlayer sample={sample} trigger={trigger} audioContext={audioContext} />
          </Step>
        )
      })}
    </React.Fragment>
  )
}

const mapStateToProps = state => {

  return {
    currentSequence: state.track.currentSequence,
    audioContext: state.track.audioContext,
    isPlaying: state.track.isPlaying,
    instruments: state.instrument.instruments,
  }
}

const mapDispatchToProps = {
  updateSequence: INSTRUMENT_ACTIONS.updateSequence,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleSelection: props => index => {
      const currentInstrument = props.instruments.find(instrument => instrument.id === props.instrumentOwner)

      let sequence = R.path(['sequences', props.currentSequence], currentInstrument)
        ? currentInstrument.sequences[props.currentSequence].slice()
        : []

      if (sequence.includes(index)) { // REMOVE
        const entry = sequence.indexOf(index)
        sequence.splice(entry, 1)
      } else { // ADD
        sequence = sequence.concat(index)
      }

      props.updateSequence({
        sequence,
        sequenceID: props.currentSequence,
        instrumentID: props.instrumentOwner,
      })
    },
  }),
)

export default enhancer(Grid)
