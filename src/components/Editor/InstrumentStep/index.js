// @flow
import React from 'react'
import withOpen from 'hocs/withOpen'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, type HOC, withHandlers, withStateHandlers, withProps, lifecycle } from 'recompose'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import type { Instrument } from 'data/instrument/types'
import { PLAYER_STATE } from 'data/track/reducer'
import StepOptions from './StepOptions'
import {
  IoMdColorWand as GearIcon,
} from 'react-icons/io'
import { IconContext } from "react-icons"
import { ActionWrapper, StepWrapper, OptionWrapper } from './styled'
import Modal from 'modals/_Modal'
import {
  loadSample
} from 'data/audio/helpers'
// $Ignore
import convolver from 'assets/samples/convolver.wav'
import { reduxStore } from '../../../index'

type Props = {
  index: number,
  instrument: Instrument,
}

let transition = false

// Global used as the reverb signal
let convolverBuffer

/**
 * @param {AudioBuffer} sampleSource - The base sample source
 * @param {AudioContext} audioContext - The audio context instance
 * @param {Object} fxChain - The fx to apply to the sample source
 */
const play = (
  sampleSource,
  audioContext,
  fxChain,
) => {
  var source = audioContext.createBufferSource(); // creates a sound source
  source.buffer = sampleSource

  // Pitch
  source.playbackRate.value = (fxChain && fxChain.pitch) || 1

  if (fxChain && fxChain.reverb && fxChain.reverb === true) {
    var convolver = audioContext.createConvolver();
    convolver.buffer = convolverBuffer
    convolver.connect(audioContext.destination)
    source.connect(convolver)
  }

  if (fxChain && fxChain.volume) {
    // Volume
    var gainNode = audioContext.createGain()
    gainNode.gain.value = fxChain.volume
    gainNode.connect(audioContext.destination)
    source.connect(gainNode)
  }

  source.connect(audioContext.destination)
  source.start(0)
}

const InstrumentStep = ({
  index,
  audioContext,
  handleSelection,
  instrument,
  currentStep,
  currentSequence,
  canPlay,
  setCanPlay,
  interval,
  playerState,
  selected,
  fx,
  setFX,
  toggleOpen,
  isOpen,
}) => {
  let trigger = canPlay && playerState === PLAYER_STATE.playing && index === currentStep && selected
  
  if (trigger) {
    if (transition && index === 15) trigger = false
  }

  // Avoids an accidental retriggering caused by the nature of this component's lifecycle update
  if (trigger) {
    setCanPlay(false)

    setTimeout(() => { setCanPlay(true) }, interval)
  }

  const fxObj = fx || {}

  return (
    <ActionWrapper>
      <StepWrapper selected={selected} key={index} index={index} onClick={() => handleSelection(index)} />
        {trigger
          ? play(instrument.sampleSource, audioContext, fxObj)
          : null
        }
      {selected &&
        <OptionWrapper>
          <IconContext.Provider value={{ color: "white"}}>
            <GearIcon onClick={toggleOpen} />
          </IconContext.Provider>
          {isOpen &&
            <Modal title='Edit FX' close={toggleOpen}>
              <StepOptions setFx={setFX} fx={fxObj} />
            </Modal>
          }
        </OptionWrapper>
      }
    </ActionWrapper>
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
  withOpen,
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => {
    const instrumentSequences = props.instrument.sequences[props.currentSequence]

    // Find corresponding FX for this step
    const match = instrumentSequences && instrumentSequences.find(entry => entry.index === props.index)

    const fx = (match && match.fx) ? match.fx : {}

    return {
      fx
    }
  }),
  withStateHandlers(
    {
      canPlay: true,
    },
    {
      setCanPlay: () => (v) => ({ canPlay: v }),
    },
  ),
  withHandlers({
    setFX: props => (key, type: 'increase' | 'decrease') => {
      let fx = props.fx || {}

      const propValue = key === 'reverb' // hardcode for now
        ? type === 'decrease' ? true : false
        : (type === 'increase' ? (fx[key] || 1) + 0.05 : (fx[key] || 1) - 0.05)

      // Update sequence

      fx = {
        ...fx,
        [key]: propValue,
      }

      let sequence = R.path(['sequences', props.currentSequence], props.instrument)
        ? props.instrument.sequences[props.currentSequence].slice()
        : []

      let targetIndex = sequence.findIndex(seq => seq.index === props.index)
      sequence[targetIndex].fx = fx

      props.updateSequence({
        sequence,
        sequenceID: props.currentSequence,
        instrumentID: props.instrument.id,
      })
    },
    handleSelection: props => (index) => {
      let sequence = R.path(['sequences', props.currentSequence], props.instrument)
        ? props.instrument.sequences[props.currentSequence].slice()
        : []

      const sequenceIndex = sequence.findIndex(seq => seq.index === index)

      if (sequenceIndex >= 0) { // REMOVE
        sequence.splice(sequenceIndex, 1)
      } else { // ADD
        sequence = sequence.concat({
          index
        })
      }

      props.updateSequence({
        sequence,
        sequenceID: props.currentSequence,
        instrumentID: props.instrument.id,
      })
    },
  }),
  withProps(props => {
    const instrumentSequence = props.instrument.sequences
      && props.instrument.sequences[props.currentSequence]

    const selected = instrumentSequence && instrumentSequence.find(seq => seq.index === props.index)

    return {
      selected,
    }
  }),
  lifecycle({
    componentDidMount() {
      // Load convolver signal
      loadSample(convolver, reduxStore.getState().track.audioContext, 1, 1, res => {
        convolverBuffer = res
      })
    },
    shouldComponentUpdate(nextProps) {
      return !this.props.selected && !nextProps.selected
        ? false
        : true
    },
    componentWillReceiveProps(nextProps) {
      // HACK. Find a better solution for this bug!
      if (this.props.currentSequence !== nextProps.currentSequence) {
        transition = true

        setTimeout(() => { transition = false }, 100)
      }
    }
  })
)

export default enhancer(InstrumentStep)
