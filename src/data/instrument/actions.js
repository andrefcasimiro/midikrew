// @flow
import type { Instrument } from './types'

// types of action
const Types = {
  ADD_INSTRUMENT: "ADD_INSTRUMENT",
  REMOVE_INSTRUMENT: "REMOVE_INSTRUMENT",
  UPDATE_INSTRUMENT_SAMPLE: "UPDATE_INSTRUMENT_SAMPLE",
  UPDATE_SEQUENCE: "UPDATE_SEQUENCE",
  UPDATE_SEQUENCE_FX: "UPDATE_SEQUENCE_FX",
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

const updateSequenceFX = (payload: {
  sequenceFX: {
    volume?: number,
    pitch?: number,
    reverb?: boolean,
  },
  sequenceID: number,
  instrumentID: number,
}) => ({
  type: Types.UPDATE_SEQUENCE_FX,
  payload,
})

export default {
  addInstrument,
  removeInstrument,
  updateInstrumentSample,
  updateSequence,
  updateSequenceFX,
  Types,
}
