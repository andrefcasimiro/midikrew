// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers, withProps } from 'recompose'
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
  sample,
  audioContext, // from redux track tree
  isPlaying, // from redux track tree
}) => {
  const currentInstrument = instruments.find(instrument => instrument.id === instrumentOwner)
  let currentSequence = currentInstrument && currentInstrument.sequences
  ? currentInstrument.sequences.slice()
  : []

  return (
    <React.Fragment>
      {generator.map(index => {
        const active = currentSequence && currentSequence.includes(index)
        const trigger = isPlaying && index === currentStep && currentSequence && currentSequence.includes(index)

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
  updateInstrument: INSTRUMENT_ACTIONS.updateInstrument,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleSelection: props => index => {
      const currentInstrument = props.instruments.find(instrument => instrument.id === props.instrumentOwner)
      let currentSequence = currentInstrument && currentInstrument.sequences
      ? currentInstrument.sequences.slice()
      : []

      if (currentSequence.includes(index)) { // REMOVE
        const entry = currentSequence.indexOf(index)
        currentSequence.splice(entry, 1)
      } else { // ADD
        currentSequence = currentSequence.concat(index)
      }

      props.updateInstrument({ props: { sequences: currentSequence }, id: props.instrumentOwner })
    }
  }),
)

export default enhancer(Grid)
