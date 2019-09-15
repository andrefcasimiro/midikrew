// @flow
import ACTIONS from './actions'
import type { Instrument } from './types'

type State = {
  instruments: Array<Instrument>,
  copyBuffer: Array<Array<{
    index: number,
    fx: {
      pitch?: number,
      volume?: number,
      reverb?: boolean,
    }
  }>>,
}

const defaultState: State = {
  instruments: [],
  copyBuffer: [],
}

const instrumentReducer = (state: typeof defaultState = defaultState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_INSTRUMENT:
      // $Ignore
      const instruments = state.instruments.slice()
      instruments.push(action.payload)

      return {
        ...state,
        instruments,
      }
    case ACTIONS.Types.REMOVE_INSTRUMENT: {
      // $Ignore
      const instruments = state.instruments.slice()
      const lastIndex = instruments.indexOf(instruments.length)
      instruments.splice(lastIndex, 1)

      return {
        ...state,
        instruments,
      }
    }
    case ACTIONS.Types.UPDATE_INSTRUMENT_SAMPLE: {
      // $Ignore
      const instruments = state.instruments.slice()
      const instrumentToUpdate = instruments.find(instrument => instrument.id === action.payload.instrumentID)

      if (instrumentToUpdate) {
        instrumentToUpdate.sampleSource = action.payload.sampleSource
        instruments[instruments.indexOf(instrumentToUpdate)] = instrumentToUpdate
      }

      return {
        ...state,
        instruments,
      }
    }
    case ACTIONS.Types.UPDATE_SEQUENCE: {
      const instrumentID = action.payload.instrumentID //
      const sequenceID = action.payload.sequenceID //
      const sequence = action.payload.sequence

      // $Ignore
      const instruments = state.instruments.slice() // Always slice the state!
      const instrumentToUpdate = instruments.find(instrument => instrument.id === instrumentID)

      if (instrumentToUpdate) {
        instrumentToUpdate.sequences[sequenceID] = sequence

        instruments[instruments.indexOf(instrumentToUpdate)] = instrumentToUpdate
      }

      return {
        ...state,
        instruments,
      }
    }
    // EDITOR
    case ACTIONS.Types.COPY_SEQUENCE: {
      const targetSequence = action.payload
      const instruments = state.instruments.slice()

      let copied = []

      instruments.forEach((instrument, index) => {
        if (instrument.sequences[targetSequence]) {

          copied.push(instrument.sequences[targetSequence])

          console.log('copied: ', copied)

        }
      })

      return {
        ...state,
        copyBuffer: copied,
      }
    }
    case ACTIONS.Types.PASTE_SEQUENCE: {
      const targetSequence = action.payload

      // $Ignore
      const instruments = state.instruments.slice()

      instruments.forEach((instrument, index) => {

        const match = state.copyBuffer[index]
        
        if (match && match.sequences && match.sequences.length) {
          console.log(match.sequences[targetSequence])
        }

        console.log('state.copyBuffer[index]: ', state.copyBuffer[index])

        //instrument.sequences[targetSequence] = state.copyBuffer[index].sequences[targetSequence]

      })


      return {
        ...state,
        instruments
      }
    }
    default:
      return state
  }
}

export default instrumentReducer
