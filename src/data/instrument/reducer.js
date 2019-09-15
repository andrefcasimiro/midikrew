// @flow
import ACTIONS from './actions'
import type { Instrument } from './types'

type State = {
  instruments: Array<Instrument>,
}

const defaultState: State = {
  instruments: [],
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
    default:
      return state
  }
}

export default instrumentReducer
