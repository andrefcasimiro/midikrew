// @flow
import {
  reduxStore
} from '../../index'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import TRACK_ACTIONS from 'data/track/actions'
import { loadSample } from 'data/audio/helpers'

export const importProject = (json: any) => {
  const file = JSON.parse(json)

  // Set BPM
  reduxStore.dispatch(
    TRACK_ACTIONS.setCurrentBPM(file.bpm)
  )


  // Set Number Of Sequences
  const fileSequencesLength = file.sequences.length
  for (let i = 1; i < fileSequencesLength; i++) {
    reduxStore.dispatch(
      TRACK_ACTIONS.addSequence()
    )
  }

  // Set Instruments (For Each Instrument, we need to load Sample)
  var audioContext = reduxStore.getState().track.audioContext

  // CLEAN ALL INSTRUMENTS BEFORE UPLOADING SAVED ONES!
  reduxStore.dispatch(
    INSTRUMENT_ACTIONS.clearAll()
  )

  file.instruments.instruments.forEach(instrument => {
    loadSample(instrument.samplePath, audioContext, 1, 1, sampleLoaded => {
      const returnedInstrument = {
        ...instrument,
        sampleSource: sampleLoaded,
      }

      reduxStore.dispatch(
        INSTRUMENT_ACTIONS.addInstrument(returnedInstrument)
      )
    })
  })
}

export const exportProject = () => {
  const instruments = reduxStore.getState().instrument
  const bpm = reduxStore.getState().track.bpm
  const sequences = reduxStore.getState().track.sequences

  const config = {
    instruments,
    bpm,
    sequences,
  }

  let encoded = JSON.stringify(config)
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(encoded);

  let exportFileDefaultName = `midikrew-${Date.now()}.json`;

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
