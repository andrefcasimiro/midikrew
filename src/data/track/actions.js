// @flow

// types of action
const Types = {
  SET_CURRENT_BPM: "SET_CURRENT_BPM",
  SET_INTERVAL: "SET_INTERVAL",
  SET_CURRENT_STEP: "SET_CURRENT_STEP",
  SET_CURRENT_SEQUENCE: "SET_CURRENT_SEQUENCE",
  ADD_SEQUENCE: "ADD_SEQUENCE",
  REMOVE_SEQUENCE: "REMOVE_SEQUENCE",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  SET_MODE: "SET_MODE",
}

// actions
const setCurrentBPM = (payload: number) => ({
  type: Types.SET_CURRENT_BPM,
  payload,
})

const setInterval = (payload: number) => ({
  type: Types.SET_INTERVAL,
  payload,
})

const setCurrentStep = (payload: number) => ({
  type: Types.SET_CURRENT_STEP,
  payload,
})

const setCurrentSequence = (payload: number) => ({
  type: Types.SET_CURRENT_SEQUENCE,
  payload,
})

const addSequence = () => ({
  type: Types.ADD_SEQUENCE,
})

const removeSequence = () => ({
  type: Types.REMOVE_SEQUENCE,
})

const play = () => ({
  type: Types.PLAY,
})

const pause = () => ({
  type: Types.PAUSE,
})

const setMode = (payload: string) => ({
  type: Types.SET_MODE,
  payload,
})

export default {
  setCurrentBPM,
  setInterval,
  setCurrentStep,
  setCurrentSequence,
  addSequence,
  removeSequence,
  play,
  pause,
  setMode,
  Types,
}
