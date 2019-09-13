// @flow
type Props = {|
  sample: Object,
  trigger: boolean,
  audioContext: any,
|}

const SamplePlayer = ({ sample, trigger, audioContext }: Props) => {
  if (trigger) {
    var source = audioContext.createBufferSource(); // creates a sound source

    // Pitch
    source.playbackRate.value = 1
    // Volume
    var gainNode = audioContext.createGain()
    gainNode.gain.value = sample.defaultVolume || 1
    source.connect(gainNode)

    gainNode.connect(audioContext.destination)
    source.buffer = sample
    source.connect(audioContext.destination)
    source.start(0)
  }

  return null
}

export default SamplePlayer