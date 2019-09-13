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
      const instruments = state.instruments
      instruments.push(action.payload)

      console.log(instruments)
      return {
        ...state,
        instruments,
      }
    case ACTIONS.Types.REMOVE_INSTRUMENT: {
      const instruments = state.instruments
      const lastIndex = instruments.indexOf(instruments.length)
      instruments.splice(lastIndex, 1)

      return {
        ...state,
        instruments,
      }
    }
    case ACTIONS.Types.UPDATE_INSTRUMENT: {
      const id = action.payload.id
      const keys = Object.keys(action.payload.props)
      const listOfUpdates = Object.values(action.payload.props)

      const instruments = state.instruments
      const instrumentToUpdate = instruments.find(instrument => instrument.id === id)

      if (instrumentToUpdate) {
        listOfUpdates.forEach((value, index) => {

          // Update for sequences for now (Array)
          if (value && value.length) {
            instrumentToUpdate[(keys[index])] = value
          }
        })

        instruments[instruments.indexOf(instrumentToUpdate)] = instrumentToUpdate

        return {
          ...state,
          instruments,
        }
      } else {
        return state
      }
    }
    default:
      return state
  }
}

export default instrumentReducer
