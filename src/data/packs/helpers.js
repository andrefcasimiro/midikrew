// @flow
import { reduxStore } from '../../index'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import type { Instrument } from 'data/instrument/types'
import { loadSample } from 'data/audio/helpers'

export const extractInstrumentFromPack = (id: string, pack: Instrument[]): ?Instrument =>
  pack.find(instrument => instrument.id === id)

export const loader = (instrument: Instrument | Instrument[]) => {
  const audioContext = reduxStore.getState().track.audioContext

  if (instrument && Array.isArray(instrument)) {
    instrument.forEach(instrument => {
      loadAsync(instrument, audioContext)
    })
  } else {
    loadAsync(instrument, audioContext)
  }
}

export const loadAsync = (instrument: Instrument, audioContext: AudioContext) => {
  loadSample(instrument.samplePath, audioContext, 1, 1, result => {

    const _instrument = {
      ...instrument,
      sampleSource: result,
    }

    reduxStore.dispatch(
      INSTRUMENT_ACTIONS.addInstrument(_instrument)
    )
  })
}
