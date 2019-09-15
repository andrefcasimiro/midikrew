// @flow
import type { Instrument } from './types'

// types of action
const Types = {
  ADD_INSTRUMENT: "ADD_INSTRUMENT",
  REMOVE_INSTRUMENT: "REMOVE_INSTRUMENT",
  UPDATE_INSTRUMENT_SAMPLE: "UPDATE_INSTRUMENT_SAMPLE",
  UPDATE_SEQUENCE: "UPDATE_SEQUENCE",
  COPY_SEQUENCE: "COPY_SEQUENCE",
  PASTE_SEQUENCE: "PASTE_SEQUENCE",
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

// Used for loading a new sample for an existing instrument or modifying its buffer (add pitch, add reverb, lower volume, etc..)
const updateInstrumentSample = (payload: { sampleSource: ?AudioBuffer, instrumentID: number }) => ({
  type: Types.ADD_INSTRUMENT,
  payload,
})

const updateSequence = (payload: { sequence: Array<number>, sequenceID: number, instrumentID: number }) => ({
  type: Types.UPDATE_SEQUENCE,
  payload,
})

const copySequence = (targetSequence: number) => ({
  type: Types.COPY_SEQUENCE,
  payload: targetSequence,
})

const pasteSequence = (targetSequence: number) => ({
  type: Types.PASTE_SEQUENCE,
  payload: targetSequence,
})

export default {
  addInstrument,
  removeInstrument,
  updateInstrumentSample,
  updateSequence,
  copySequence,
  pasteSequence,
  Types,
}
