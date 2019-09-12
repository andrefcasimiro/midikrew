// @flow
import React from 'react'
import { compose, type HOC, withStateHandlers, } from 'recompose'
// $Ignore
import kick606bd3 from 'assets/samples/mc303/606bd3.wav'
// $Ignore
import snare606sd1 from 'assets/samples/mc303/606sd1.wav'
import {
  GoPlay as PlayIcon,
  GoDiffAdded as PlusIcon,
  GoDiffRemoved as RemoveIcon,
} from 'react-icons/go'
import Grid from 'components/Grid'
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

type Props = {|

|}

/**
 * Manages all sequencers in the song
 * @param {} param0
 */

const SequenceManager = ({
  currentSequenceIndex,
  setCurrentSequence,
  sequences,
  addSequence,
  removeSequence,
  instruments,
  addInstrument,
  removeInstrument,
  updateSequence,
}) => {

  const newSequence = {
    id: `Sequence ${Date.now()}`,
    pattern: [],
    numberOfSteps: 16,
  }

  const newInstrument = {
    id: `Instrument ${Date.now()}`,
    name: 'Snare',
    sample: snare606sd1,
    sequences: [],
  }


  return (
    <React.Fragment>
      <BoxSection>
        {/* Sequence List */}
        <MainContainer>
          <LeftContainer>
            <Button><PlayIcon /></Button>
            <Button onClick={() => addSequence(newSequence)}><PlusIcon /></Button>
            <Button onClick={removeSequence} disabled={sequences.length <= 1}>
              <RemoveIcon />
            </Button>
          </LeftContainer>
          <RightContainer>
            {sequences.map((sequence, index) =>
              <Sequence onClick={() => setCurrentSequence(index)} key={sequence.id} active={currentSequenceIndex === index} />
            )}
          </RightContainer>
        </MainContainer>
      </BoxSection>
        <Wrapper>
          <InstrumentMenuColumn>
            <InstrumentMenu>
              <Button>
                <PlusIcon onClick={() => addInstrument(newInstrument) }/>
              </Button>
              <Button>
                <RemoveIcon onClick={removeInstrument} />
              </Button>
            </InstrumentMenu>
          </InstrumentMenuColumn>
        </Wrapper>
        {/* Grid */}
        <Wrapper>
          {instruments.map(instrument =>
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
                />
              </GridWrapper>
            </Column>
          )}
        </Wrapper>
    </React.Fragment>
  )
}

type SequenceType = {
  id: string,
  pattern: Array<*>,
  numberOfSteps: number,
}

type InstrumentType = {
  id: string,
  name: string,
  sample: string,
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers(
    {
      currentSequenceIndex: 0,
      sequences: [
        {
          id: Date.now(),
          pattern: [],
          numberOfSteps: 16,
        },
      ],
      instruments: [
        {
          id: `Instrument ${Date.now()}`,
          name: `Kick`,
          sample: kick606bd3,
          sequences: [],
        },
      ],
    },
    {
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
)

export default enhancer(SequenceManager)
