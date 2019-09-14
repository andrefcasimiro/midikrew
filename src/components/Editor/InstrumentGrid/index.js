// @flow
import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers, withStateHandlers } from 'recompose'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import { PLAYER_STATE } from 'data/track/reducer'
import SamplePlayer from '../SamplePlayer'
import { Step } from './styled'


const generator = []
for (let i = 0; i < 16; i++) {
  generator.push(i)
}

const InstrumentGrid = ({
  interval, // from redux track tree
  handleSelection,
  instruments, // from redux track tree
  instrumentOwner, // from parent component
  currentStep,
  currentSequence,
  sample,
  audioContext, // from redux track tree
  playerState, // from redux track tree
  canPlay, // from withStateHandlers
  setCanPlay, // from withStateHandlers
}) => {
  const instrument = instruments.find(i => i.id === instrumentOwner)
  const sequence = instrument.sequences && instrument.sequences[currentSequence]

  return (
    <React.Fragment>
      {generator.map(index => {

        const active = sequence && sequence.includes(index)
        const trigger = canPlay && active && playerState === PLAYER_STATE.playing && index === currentStep

        // Avoids an accidental retriggering caused by the nature of this component's lifecycle update
        if (trigger) {
          setCanPlay(false)

          setTimeout(() => { setCanPlay(true) }, interval)
        }

        return (
          <Step active={active} key={index} index={index} onClick={() => handleSelection(index)}>
            <SamplePlayer sample={sample} trigger={trigger} audioContext={audioContext} />
          </Step>
        )
      })}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  interval: state.track.interval,
  currentSequence: state.track.currentSequence,
  audioContext: state.track.audioContext,
  playerState: state.track.playerState,
  instruments: state.instrument.instruments,
})

const mapDispatchToProps = {
  updateSequence: INSTRUMENT_ACTIONS.updateSequence,
}

const enhancer: HOC<*, {}> = compose(
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

export default enhancer(InstrumentGrid)
