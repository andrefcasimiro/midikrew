// @flow
import ACTIONS from './actions'
import type { Instrument } from './types'

type State = {
  instruments: Array<Instrument>,
  copyBuffer: Array<{
    instrumentID: number,
    sequence: {
      index: number,
      fx: {
        pitch?: number,
        volume?: number,
        reverb?: boolean,
      },
    },
  }>,
}

const defaultState: State = {
  instruments: [],
  copyBuffer: [],
}

const instrumentReducer = (state: typeof defaultState = defaultState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_INSTRUMENT:

      if (state.instruments.find(entry => entry.name === action.payload.name)) {
        return state;
      }

      const instrumentToAdd = {
        ...action.payload,
        id: Date.now(),
      }

      // $Ignore
      const instruments = state.instruments.slice()
      instruments.push(instrumentToAdd)

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
      const { instrumentID, sequenceID, sequence } = action.payload

      return {
        ...state,
        // $Ignore
        instruments: state.instruments.map((entry, index) => {
          if (entry.id === instrumentID) {
            entry.sequences.splice(sequenceID, 0, sequence)
          }

          return entry;
        }),
      }
    }
    // EDITOR
    case ACTIONS.Types.COPY_SEQUENCE: {
      const targetSequence = action.payload
      const instruments = state.instruments.slice()

      // TODO: Transform into a map
      let copied = []

      instruments.forEach((instrument, index) => {
        if (instrument.sequences[targetSequence]) {
          copied.push({
            instrumentID: instrument.id,
            sequence: instrument.sequences[targetSequence],
            sequenceID: targetSequence,
          })
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
      const copyBuffer = state.copyBuffer.slice()

      instruments.forEach((instrument) => {

        const match = copyBuffer.findIndex(entry => entry.instrumentID === instrument.id)

        if (match !== -1) {
          // $Ignore
          instrument.sequences[targetSequence] = state.copyBuffer[match].sequence
        }
      })

      return {
        ...state,
        instruments
      }
    }
    case ACTIONS.Types.CLEAR_ALL: {
      return {
        ...state,
        instruments: [],
      }
    }
    default:
      return state
  }
}

export default instrumentReducer
