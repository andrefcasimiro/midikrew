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
import { StepWrapper, Selected } from './styled'
import Modal from 'modals/_Modal'
import { Field } from 'componentsStyled/Typography'

type Props = {
  index: number,
  instrument: Instrument,
}

/**
 *
 * @param {AudioBuffer} sampleSource - The base sample source
 * @param {AudioContext} audioContext - The audio context instance
 * @param {Object} fxChain - The fx to apply to the sample source
 */
const play = (
  sampleSource,
  audioContext,
  fxChain = {
    pitch: 1,
    volume: 1,
    reverb: 1,
  },
) => {
  var source = audioContext.createBufferSource(); // creates a sound source

  source.buffer = sampleSource

  // Pitch
  source.playbackRate.value = fxChain.pitch

  source.connect(audioContext.destination)

  source.start(0)
}

const InstrumentStep = ({
  index,
  audioContext,
  handleSelection,
  instrument,
  currentStep,
  canPlay,
  setCanPlay,
  interval,
  playerState,
  selected,
  fx,
  increaseFX,
  decreaseFX,
  toggleOpen,
  isOpen,
}) => {
  const trigger = canPlay && selected && playerState === PLAYER_STATE.playing && index === currentStep

  // Avoids an accidental retriggering caused by the nature of this component's lifecycle update
  if (trigger) {
    setCanPlay(false)

    setTimeout(() => { setCanPlay(true) }, interval)
  }

  return (
    <React.Fragment>
      {selected &&

        <>
        <Field onClick={toggleOpen}>Open</Field>
        {isOpen &&
          <Modal title='Edit FX' close={toggleOpen}>
            <StepOptions increaseValue={increaseFX} decreaseValue={decreaseFX} />
          </Modal>
        }
        </>
      }
      <StepWrapper key={index} index={index} onClick={() => handleSelection(index)}>
        {selected && <Selected />
        }
        {trigger
          ? play(instrument.sampleSource, audioContext, fx)
          : null
        }
      </StepWrapper>
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
  withOpen,
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      canPlay: true,
      fx: [
        // Needs to be an array because we have sequences. Connect each sample fx to its correct sequence
        {
          pitch: 1,
          volume: 1,
          reverb: 1,
        }
      ],
    },
    {
      setCanPlay: () => (v) => ({ canPlay: v }),
      setFX: () => (fx) => ({ fx }),
    },
  ),
  withHandlers({
    increaseFX: props => key => {
      let newFx = props.fx

      newFx = {
        ...newFx,
        [key]: newFx[key] + 1,
      }

      props.setFX(newFx)
    },
    decreaseFX: props => key => {
      let newFx = props.fx

      newFx = {
        ...newFx,
        [key]: newFx[key] - 0.1,
      }

      props.setFX(newFx)
    },
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
  withProps(props => {
    const instrumentSequence = props.instrument.sequences && props.instrument.sequences[props.currentSequence]

    const selected = instrumentSequence && instrumentSequence.includes(props.index)

    return {
      selected,
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (
        (!this.props.selected && !nextProps.selected)
      ) {
        return false
      }

      return true
    }
  })
)

export default enhancer(InstrumentStep)
