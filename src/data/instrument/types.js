// @flow

export type Instrument = {
  id: string,
  name: string,
  samplePath: string,
  sampleSource: ?AudioBuffer,
  sequences: Array<Array<{
    fx?: {
      pitch?: number,
      volume?: number,
      reverb?: boolean,
    },
  }>>,
}
