// @flow
type Props = {|
  sample: Object,
  trigger: boolean,
  audioContext: any,
|}

const SamplePlayer = ({ sample, trigger, audioContext }: Props) => {
  var source = audioContext.createBufferSource(); // creates a sound source

  if (trigger) {
    source.buffer = sample
    source.connect(audioContext.destination)

    source.start(0)
  }

  return null
}

export default SamplePlayer
