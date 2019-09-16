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

export const PLAYER_MODE = {
  continuous: 'continuous',
  loop: 'loop',
}

type State = {
  bpm: number,
  interval: number, // the interval of a loop based on bpms and lines per beat
  currentStep: number,
  currentSequence: number,
  sequences: Array<{
    id: string,
    numberOfSteps: number,
  }>,
  audioContext: AudioContext,
  playerState: 'playing' | 'paused',
  playerMode: 'continuous' | 'loop',
}

const defaultState: State = {
  bpm: 120,
  interval: 200,
  currentStep: 0,
  currentSequence: 0,
  sequences: [
    {
      id: `Sequence ${Date.now()}`,
      numberOfSteps: 16,
    },
  ],
  audioContext,
  playerState: 'paused',
  playerMode: 'continuous',
}

const trackReducer = (state: typeof defaultState = defaultState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case ACTIONS.Types.SET_CURRENT_BPM: {
      return {
        ...state,
        bpm: action.payload,
      }
    }
    case ACTIONS.Types.SET_INTERVAL: {
      return {
        ...state,
        interval: action.payload,
      }
    }
    case ACTIONS.Types.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      }
    case ACTIONS.Types.SET_CURRENT_SEQUENCE: {
      return {
        ...state,
        currentSequence: action.payload,
        currentStep: 0,
      }
    }
    case ACTIONS.Types.ADD_SEQUENCE: {
      const newSequence = {
        id: `seq-${state.sequences.length + 1}`,
        numberOfSteps: 16,
      }

      // $Ignore
      const sequences = state.sequences.slice()
      sequences.push(newSequence)

      return {
        ...state,
        sequences,
      }
    }
    case ACTIONS.Types.REMOVE_SEQUENCE: {
      // $Ignore
      const sequences = state.sequences.slice()
      sequences.splice(state.sequences.length - 1, 1)

      return {
        ...state,
        sequences,
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
    case ACTIONS.Types.SET_MODE: {
      return {
        ...state,
        playerMode: action.payload,
      }
    }
    default:
      return state
  }
}

export default trackReducer
