// @flow
import { reduxStore } from '../../index'
// $Ignore
import convolver_sample from 'assets/samples/convolver.wav'

export const loadSample = async (
  url: string,
  audioContext: AudioContext,
  pitch: number = 1,
  volume: number = 1,
  callback: Function,
) => {
  var request = new XMLHttpRequest()

//  var originalUrl = url
  url = url.replace('public/', '/')

  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  // Decode asynchronously
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      // Now for the fun part :)
      var source = audioContext.createBufferSource(); // creates a sound source

      // Pitch
      source.playbackRate.value = pitch
      // Volume
      var gainNode = audioContext.createGain()
      gainNode.gain.value = volume


      gainNode.connect(audioContext.destination)
      source.connect(gainNode)

      source.buffer = buffer
      source.connect(audioContext.destination)

      callback(buffer)
    }, () => {})
  }

  request.send()
}

// Global used as the reverb signal
let convolverBuffer

/**
 * @param {AudioBuffer} sampleSource - The base sample source
 * @param {AudioContext} audioContext - The audio context instance
 * @param {Object} fxChain - The fx to apply to the sample source
 */
export const play = (
  sampleSource: AudioBuffer,
  audioContext: AudioContext,
  fxChain: Object,
) => {
  if (!convolverBuffer) {
    // Load convolver signal
    loadSample(convolver_sample, reduxStore.getState().track.audioContext, 1, 1, response => {
      convolverBuffer = response
    })
  }

  var source = audioContext.createBufferSource(); // creates a sound source
  source.buffer = sampleSource

  // Pitch
  source.playbackRate.value = (fxChain && fxChain.pitch) || 1

  if (fxChain && fxChain.reverb && fxChain.reverb === true) {
    var convolver = audioContext.createConvolver();
    convolver.buffer = convolverBuffer
    convolver.connect(audioContext.destination)
    source.connect(convolver)
  }

  if (fxChain && fxChain.volume) {
    // Volume
    var gainNode = audioContext.createGain()
    gainNode.gain.value = fxChain.volume
    gainNode.connect(audioContext.destination)
    source.connect(gainNode)
  }

  source.connect(audioContext.destination)
  source.start(0)
}
