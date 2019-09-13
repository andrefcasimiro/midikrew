// @flow
import React from 'react'
import { compose, type HOC, withStateHandlers, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import {
  GoDiffAdded as PlusIcon,
  GoDiffRemoved as RemoveIcon,
} from 'react-icons/go'
import {
  TiMediaPlay as PlayIcon,
  TiMediaPause as PauseIcon,
} from 'react-icons/ti'
import Bpm from 'components/Bpm'
import Grid from 'components/Grid'
import Sequence from 'components/Sequence'
import InstrumentsManager from 'components/InstrumentsManager'
import {
  loadSample,
} from 'data/audio/helpers'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import TRACK_ACTIONS from 'data/track/actions'
import { PLAYER_STATE } from 'data/track/reducer'
import {
  StyledBoxSection as BoxSection,
  MainContainer,
  LeftContainer,
  RightContainer,
  Wrapper,
  Column,
  Instrument,
  GridWrapper,
} from './styled'
import { IconButton } from 'componentsStyled/Buttons'
import {
  tr909Minimal,
} from '../../data/audio/templates'

// Globals
let timerID

const SequenceManager = ({
  playerState,
  handlePlayer,
  currentStep,
  currentSequence, // from redux track tree
  sequences,
  addSequence,
  removeSequence,
  instruments, // from redux instrument tree
}) => {

  // Templates
  const newSequence = {
    id: `Sequence ${Date.now()}`,
    pattern: [],
    numberOfSteps: 16,
  }

  return (
    <React.Fragment>
      <BoxSection>
        {/* Sequence List */}
        <MainContainer>
          <LeftContainer>
            <IconButton onClick={handlePlayer}>{playerState === PLAYER_STATE.playing ? <PauseIcon /> : <PlayIcon />}</IconButton>
            <IconButton onClick={() => addSequence(newSequence)}><PlusIcon /></IconButton>
            <IconButton onClick={removeSequence} disabled={sequences.length <= 1}>
              <RemoveIcon />
            </IconButton>
          </LeftContainer>
          <RightContainer>
            {sequences.map((sequence, index) => <Sequence key={sequence.id} id={index} />)}
          </RightContainer>
        </MainContainer>
      </BoxSection>

      <InstrumentsManager />

        <Wrapper>
          <Column>
            <Instrument blank/>
            <GridWrapper blank>
              <Bpm currentStep={currentStep} />
            </GridWrapper>
          </Column>
          {instruments.map((instrument, index) =>
            <Column key={instrument.id}>
              <Instrument>
                {instrument.name}
              </Instrument>
              <GridWrapper>
                <Grid
                  instrumentOwner={instrument.id}
                  currentStep={currentStep}
                  sample={instrument.sampleSource}
                />
              </GridWrapper>
            </Column>
          )}
        </Wrapper>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    audioContext: state.track.audioContext,
    playerState: state.track.playerState,
    currentSequence: state.track.currentSequence,
    instruments: state.instrument.instruments,
  }
}

const mapDispatchToProps = {
  addInstrument: INSTRUMENT_ACTIONS.addInstrument,
  removeInstrument: INSTRUMENT_ACTIONS.removeInstrument,
  play: TRACK_ACTIONS.play,
  pause: TRACK_ACTIONS.pause,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      // Relates to all the steps in a pattern (where are we in the song?)
      currentStep: 0,

      sequences: [
        {
          id: Date.now(),
          pattern: [],
          numberOfSteps: 16,
        },
      ],
    },
    {
      // Step Position
      setCurrentStep: props => currentStep => ({ currentStep }),

      // Sequences
      addSequence: props => sequence => ({ sequences: props.sequences.concat(sequence) }),
      removeSequence: props => () => ({ sequences: props.sequences.slice(1) }),
    },
  ),
  withHandlers({
    addInstrumentHandler: props => instrument => {
      if (instrument.length) {
        // Multiple instruments
        instrument.forEach(i => {
          loadSample(i.samplePath, props.audioContext, 1, 1, result => {
            const _instrument = {
              ...i,
              sampleSource: result,
            }

            props.addInstrument(_instrument)
          })
        })
      } else {
        // Only one instrument
        loadSample(instrument.samplePath, props.audioContext, 1, 1, result => {
          const _instrument = {
            ...instrument,
            sampleSource: result,
          }

          props.addInstrument(_instrument)
        })
      }
    },
  }),
  withHandlers({
    manageNextPosition: props => () => props.currentStep + 1 >= 16
      ? props.setCurrentStep(0)
      : props.setCurrentStep(props.currentStep + 1),
  }),
  withHandlers({
    handlePlayer: props => () => {
      if (props.playerState === PLAYER_STATE.playing) {
        clearInterval(timerID)

        return props.pause()
      }

      const tempo = 120
      const linesPerBeat = 4
      const interval = ((Math.pow(10, 4) * 6) / linesPerBeat) / tempo

      timerID = setInterval(() => props.manageNextPosition(), interval)

      return props.play()
    },
  }),
  lifecycle({
    // If we want to load a bunch of default instruments! :-)
    componentWillMount() {
      this.props.addInstrumentHandler(tr909Minimal)
    },
  })
)

export default enhancer(SequenceManager)
