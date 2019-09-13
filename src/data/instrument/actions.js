// @flow
import type { Instrument } from './types'

// types of action
const Types = {
  ADD_INSTRUMENT: "ADD_INSTRUMENT",
  REMOVE_INSTRUMENT: "REMOVE_INSTRUMENT",
  UPDATE_SEQUENCE: "UPDATE_SEQUENCE",
}

// actions
const addInstrument = (payload: Instrument) => ({
  type: Types.ADD_INSTRUMENT,
  payload,
})

const removeInstrument = (payload: number) => ({
  type: Types.REMOVE_INSTRUMENT,
  payload,
})

const updateSequence = (payload: { sequence: Array<number>, sequenceID: number, instrumentID: number }) => ({
  type: Types.UPDATE_SEQUENCE,
  payload,
})

export default {
  addInstrument,
  removeInstrument,
  updateSequence,
  Types,
}
