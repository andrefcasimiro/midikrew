// @flow
import ACTIONS from './actions'

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 44100,
})

export const PLAYER_STATE = {
  playing: 'playing',
  paused: 'paused',
}

type State = {
  currentStep: number,
  currentSequence: number,
  audioContext: AudioContext,
  playerState: 'playing' | 'paused',
}

const defaultState: State = {
  currentStep: 0,
  currentSequence: 0,
  audioContext,
  playerState: 'paused',
}

const trackReducer = (state: typeof defaultState = defaultState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case ACTIONS.Types.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      }
    case ACTIONS.Types.SET_CURRENT_SEQUENCE: {
      return {
        ...state,
        currentSequence: action.payload,
      }
    }
    case ACTIONS.Types.PLAY: {
      state.audioContext.resume()

      return {
        ...state,
        playerState: PLAYER_STATE.playing,
      }
    }
    case ACTIONS.Types.PAUSE: {
      state.audioContext.suspend()

      return {
        ...state,
        playerState: PLAYER_STATE.paused,
      }
    }
    default:
      return state
  }
}

export default trackReducer
