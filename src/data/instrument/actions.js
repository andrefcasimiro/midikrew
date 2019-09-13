// @flow
import type { Instrument } from './types'

// types of action
const Types = {
  ADD_INSTRUMENT: "ADD_INSTRUMENT",
  REMOVE_INSTRUMENT: "REMOVE_INSTRUMENT",
  UPDATE_INSTRUMENT: "UPDATE_INSTRUMENT",
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

const updateInstrument = (payload: { props: any, id: number }) => ({
  type: Types.UPDATE_INSTRUMENT,
  payload,
})

export default {
  addInstrument,
  removeInstrument,
  updateInstrument,
  Types,
}
