// @flow

// types of action
const Types = {
  SET_CURRENT_STEP: "SET_CURRENT_STEP",
  SET_CURRENT_SEQUENCE: "SET_CURRENT_SEQUENCE",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
}

// actions
const setCurrentStep = (payload: number) => ({
  type: Types.SET_CURRENT_STEP,
  payload,
})

const setCurrentSequence = (payload: number) => ({
  type: Types.SET_CURRENT_SEQUENCE,
  payload,
})

const play = () => ({
  type: Types.PLAY,
})

const pause = () => ({
  type: Types.PAUSE,
})

export default {
  setCurrentStep,
  setCurrentSequence,
  play,
  pause,
  Types,
}
