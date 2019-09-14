// @flow
import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers, withStateHandlers } from 'recompose'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import type { Instrument } from 'data/instrument/types'
import { PLAYER_STATE } from 'data/track/reducer'
import { Step } from './styled'

type Props = {
  index: number, // The index of the step in the Instrument grid
//  audioContext: AudioContext,
//  handleSelection: Function, // The handler for when we select / unselect this step
  instrument: Instrument, // The instrument this step belongs to
  // currentStep: number, // comes from redux
//  interval: number, // Comes from redux
//  playerState: string, // Comes from redux
}

const play = (sampleSource, audioContext) => {
  var source = audioContext.createBufferSource(); // creates a sound source

  source.buffer = sampleSource
  source.connect(audioContext.destination)

  source.start(0)
}

const InstrumentStep = ({
  index,
  audioContext,
  handleSelection,
  instrument,
  currentSequence,
  currentStep,
  canPlay,
  setCanPlay,
  interval,
  playerState,
}) => {
  const instrumentSequence = instrument.sequences && instrument.sequences[currentSequence]

  const selected = instrumentSequence && instrumentSequence.includes(index)
  const trigger = canPlay && selected && playerState === PLAYER_STATE.playing && index === currentStep

  // Avoids an accidental retriggering caused by the nature of this component's lifecycle update
  if (trigger) {
    setCanPlay(false)

    setTimeout(() => { setCanPlay(true) }, interval)
  }

  return (
    <React.Fragment>
      <Step selected={selected} key={index} index={index} onClick={() => handleSelection(index)}>
        {trigger
          ? play(instrument.sampleSource, audioContext)
          : null
        }
      </Step>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  interval: state.track.interval,
  currentStep: state.track.currentStep,
  currentSequence: state.track.currentSequence,
  audioContext: state.track.audioContext,
  playerState: state.track.playerState,
  instruments: state.instrument.instruments,
})

const mapDispatchToProps = {
  updateSequence: INSTRUMENT_ACTIONS.updateSequence,
}

const enhancer: HOC<*, Props> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      canPlay: true,
    },
    {
      setCanPlay: () => (v) => ({ canPlay: v }),
    },
  ),
  withHandlers({
    handleSelection: props => index => {
      let sequence = R.path(['sequences', props.currentSequence], props.instrument)
        ? props.instrument.sequences[props.currentSequence].slice()
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
        instrumentID: props.instrument.id,
      })
    },
  }),
)

export default enhancer(InstrumentStep)
