// @flow
import React from 'react'
import { compose, type HOC, withStateHandlers, withHandlers, lifecycle } from 'recompose'
// $Ignore
import kick606bd3 from 'assets/samples/mc303/606bd3.wav'
// $Ignore
import snare606sd1 from 'assets/samples/mc303/606sd1.wav'
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
import {
  loadSample,
} from 'data/audio/helpers'
import {
  StyledBoxSection as BoxSection,
  MainContainer,
  LeftContainer,
  RightContainer,
  Sequence,
  Button,
  Wrapper,
  Column,
  Instrument,
  GridWrapper,
  InstrumentMenuColumn,
  InstrumentMenu,
} from './styled'
import {
  tr909,
} from './templates'

type Props = {|

|}

/**
 * Manages all sequencers in the song
 */



// type SequenceType = {
//   id: string,
//   pattern: Array<*>,
//   numberOfSteps: number,
// }

// type InstrumentType = {
//   id: string,
//   name: string,
//   sample: string,
// }

// Globals (don't hook this to state)

let timerID

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 44100,
})

// End of globals

const SequenceManager = ({
  isPlaying,
  togglePlayHandler,
  currentStep,
  currentSequenceIndex,
  setCurrentSequence,
  sequences,
  addSequence,
  removeSequence,
  instruments,
  addInstrumentHandler,
  removeInstrument,
  updateSequence,
}) => {

  // Templates
  const newSequence = {
    id: `Sequence ${Date.now()}`,
    pattern: [],
    numberOfSteps: 16,
  }

  const newInstrument = {
    id: `Instrument ${Date.now()}`,
    name: 'Snare',
    samplePath: snare606sd1,
    sampleSource: undefined,
    sequences: [],
  }

  return (
    <React.Fragment>
      <BoxSection>
        {/* Sequence List */}
        <MainContainer>
          <LeftContainer>
            <Button onClick={togglePlayHandler}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</Button>
            <Button onClick={() => addSequence(newSequence)}><PlusIcon /></Button>
            <Button onClick={removeSequence} disabled={sequences.length <= 1}>
              <RemoveIcon />
            </Button>
          </LeftContainer>
          <RightContainer>
            {sequences.map((sequence, index) =>
              <Sequence onClick={() => setCurrentSequence(index)} key={sequence.id} active={currentSequenceIndex === index}>{index + 1}</Sequence>
            )}
          </RightContainer>
        </MainContainer>
      </BoxSection>
        <Wrapper>
          <InstrumentMenuColumn>
            <InstrumentMenu>
              <Button>
                <PlusIcon onClick={() => addInstrumentHandler(newInstrument) }/>
              </Button>
              <Button>
                <RemoveIcon onClick={removeInstrument} />
              </Button>
            </InstrumentMenu>
          </InstrumentMenuColumn>
        </Wrapper>
        {/* Grid */}
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
                  onChange={updateSequence}
                  currentSequence={instrument.sequences[currentSequenceIndex]}
                  currentSequenceIndex={currentSequenceIndex}
                  currentStep={currentStep}
                  sample={instrument.sampleSource}
                  audioContext={audioContext}
                />
              </GridWrapper>
            </Column>
          )}
        </Wrapper>
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers(
    {
      isPlaying: false,

      // Relates to all the steps in a pattern (where are we in the song?)
      currentStep: 0,

      // Relates to all the patterns
      currentSequenceIndex: 0,

      sequences: [
        {
          id: Date.now(),
          pattern: [],
          numberOfSteps: 16,
        },
      ],
      instruments: [],
    },
    {
      // Set play / stop
      togglePlay: props => () => ({ isPlaying: !props.isPlaying }),


      // Step Position
      setCurrentStep: props => currentStep => ({ currentStep }),

      // Sequencer Position
      setCurrentSequence: props => currentSequenceIndex => ({ currentSequenceIndex }),

      // Sequences
      addSequence: props => sequence => ({ sequences: props.sequences.concat(sequence) }),
      removeSequence: props => () => ({ sequences: props.sequences.slice(1) }),

      // Instruments
      addInstrument: props => instrument => ({ instruments: props.instruments.concat(instrument) }),
      removeInstrument: props => () => {
        const lastIndex = props.instruments.indexOf(props.instruments.length)
        const instruments = props.instruments.slice()
        instruments.splice(lastIndex, 1)

        return {
          instruments,
        }
      },

      // Update sequence of an instrument
      updateSequence: props => (sequence, instrumentID) => {
        const entry = props.instruments.find(instrument => instrument.id === instrumentID)
        const index = props.instruments.indexOf(entry)
        const instruments = props.instruments.slice()

        instruments[index] = {
          ...instruments[index],
          sequences: {
            ...instruments[index].sequences,
            [props.currentSequenceIndex]: sequence,
          },
        }

        return {
          instruments,
        }
      }
    },
  ),
  withHandlers({
    addInstrumentHandler: props => instrument => {
      if (instrument.length) {
        console.log(instrument)
        // Multiple instruments
        instrument.forEach(i => {
          loadSample(i.samplePath, audioContext, 1, 1, result => {
            const _instrument = {
              ...i,
              sampleSource: result,
            }

            console.log(result)

            props.addInstrument(_instrument)
          })
        })
      } else {
        // Only one instrument
        loadSample(instrument.samplePath, audioContext, 1, 1, result => {
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
      const tempo = 120
      const linesPerBeat = 4
      const interval = ((Math.pow(10, 4) * 6) / linesPerBeat) / tempo

      timerID = setInterval(() => props.manageNextPosition(), interval)
    },
    clearPlayer: () => () => clearInterval(timerID),
  }),
  withHandlers({
    togglePlayHandler: props => () => {
      if (!props.isPlaying) {
        audioContext.resume()
        props.handlePlayer()
      } else {
        audioContext.suspend()
        props.clearPlayer()
      }

      props.togglePlay()
    },
  }),
  lifecycle({
    // If we want to load a bunch of default instruments! :-)
    componentWillMount() {
      this.props.addInstrumentHandler(tr909)
    }
  })
)

export default enhancer(SequenceManager)
