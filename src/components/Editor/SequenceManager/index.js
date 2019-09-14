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
  TiArrowLoop as LoopIcon,
} from 'react-icons/ti'
import CurrentStep from '../CurrentStep'
import InstrumentGrid from '../InstrumentGrid'
import Sequence from '../Sequence'
import InstrumentsManager from '../InstrumentsManager'
import SongSettings from '../SongSettings'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import TRACK_ACTIONS from 'data/track/actions'
import { loadPack } from 'data/audio/helpers'
import { PLAYER_STATE, PLAYER_MODE } from 'data/track/reducer'
import { IconButton } from 'componentsStyled/Buttons'
import {
  StyledBoxSection as BoxSection,
  MainContainer,
  SongTools,
  TopContainer,
  BottomContainer,
  Wrapper,
  Column,
  Instrument,
  GridWrapper,
} from './styled'
import { tr909 } from 'data/audio/tr909'

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
  handleMode,
  playerMode,
}) => {
  return (
    <React.Fragment>
      <BoxSection>
        {/* Sequence List */}
        <MainContainer>
          <TopContainer>
            <IconButton title='Remove a sequence' onClick={removeSequence} disabled={sequences.length <= 1}><RemoveIcon /></IconButton>
            <IconButton title='Play / pause player' onClick={handlePlayer}>{playerState === PLAYER_STATE.playing ? <PauseIcon /> : <PlayIcon />}</IconButton>
            <IconButton title='Lock / unlock the sequencer for a specific loop' onClick={handleMode} enabled={playerMode === PLAYER_MODE.loop}><LoopIcon /></IconButton>
            <IconButton title='Add a new sequence' onClick={addSequence}><PlusIcon /></IconButton>
          </TopContainer>
          <BottomContainer>
            {sequences.map((sequence, index) => <Sequence key={sequence.id} id={index} />)}
          </BottomContainer>
        </MainContainer>
      </BoxSection>

      <SongTools>
        <InstrumentsManager />
        <SongSettings />
      </SongTools>

        <Wrapper>
          <Column>
            <Instrument blank/>
            <GridWrapper blank><CurrentStep currentStep={currentStep} /></GridWrapper>
          </Column>

          {instruments.map((instrument, index) =>
            <Column key={instrument.id}>
              <Instrument>
                <p>{instrument.name}</p>
              </Instrument>
              <GridWrapper>
                <InstrumentGrid
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

const mapStateToProps = state => ({
  audioContext: state.track.audioContext,
  bpm: state.track.bpm,
  playerState: state.track.playerState,
  playerMode: state.track.playerMode,
  currentSequence: state.track.currentSequence,
  sequences: state.track.sequences,
  instruments: state.instrument.instruments,
})

const mapDispatchToProps = {
  addInstrument: INSTRUMENT_ACTIONS.addInstrument,
  removeInstrument: INSTRUMENT_ACTIONS.removeInstrument,
  setInterval: TRACK_ACTIONS.setInterval,
  addSequence: TRACK_ACTIONS.addSequence,
  setCurrentSequence: TRACK_ACTIONS.setCurrentSequence,
  removeSequence: TRACK_ACTIONS.removeSequence,
  play: TRACK_ACTIONS.play,
  pause: TRACK_ACTIONS.pause,
  setMode: TRACK_ACTIONS.setMode,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      // Relates to all the steps in a pattern (where are we in the song?)
      currentStep: 0,
    },
    {
      // Step Position
      setCurrentStep: props => currentStep => ({ currentStep }),
    },
  ),
  withHandlers({
    manageNextPosition: props => () => {
      if (props.currentStep + 1 >= 16) {
        if (props.playerMode === PLAYER_MODE.loop) {
          return props.setCurrentStep(0)
        }

        if (props.currentSequence + 2 <= props.sequences.length) {
          props.setCurrentSequence(props.currentSequence + 1)
          props.setCurrentStep(0)
        } else {
          props.setCurrentSequence(0)
          props.setCurrentStep(0)
        }

      } else {
        props.setCurrentStep(props.currentStep + 1)
      }
    }
  }),
  withHandlers({
    handlePlayer: props => () => {
      if (props.playerState === PLAYER_STATE.playing) {
        clearInterval(timerID)

        return props.pause()
      }

      const tempo = props.bpm || 120
      const linesPerBeat = 4
      const interval = ((Math.pow(10, 4) * 6) / linesPerBeat) / tempo

      timerID = setInterval(() => props.manageNextPosition(), interval)

      // store interval
      props.setInterval(interval)

      return props.play()
    },
    handleMode: props => () => props.playerMode === PLAYER_MODE.loop
      ? props.setMode(PLAYER_MODE.continuous)
      : props.setMode(PLAYER_MODE.loop),
  }),
  lifecycle({
    componentDidMount() {
      loadPack(tr909)
    },

    // If bpm changes, clear and reset interval of timerID
    componentWillUpdate(nextProps) {
      if (this.props.bpm !== nextProps.bpm) {
        clearInterval(timerID)

        this.props.handlePlayer()
      }
    }
  })
)

export default enhancer(SequenceManager)
