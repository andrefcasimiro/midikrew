// @flow
import React from 'react'
import { compose, type HOC, withHandlers } from 'recompose'
import SamplePlayer from 'components/SamplePlayer'
import {
  Step,
} from './styled'

type Props = {|
  instrumentOwner: number,
  onChange: (sequence: Array<*>, instrumentID: number) => mixed,
  currentSequence: Array<*>,
  currentSequenceIndex: number,
  currentStep: number,
  sample: Object,
  audioContext: any,
  isPlaying: boolean,
|}

const Grid = ({
  handleSelection,
  currentSequence,
  currentStep,
  sample,
  audioContext,
  isPlaying,
}) => {
  const generator = []
  for (let i = 0; i < 16; i++) {
    generator.push(i)
  }
  console.log('redrawing steps')
  return (
    <React.Fragment>
      {generator.map(note =>
        <Step active={currentSequence && currentSequence.includes(note)} key={note} index={note} onClick={() => handleSelection(note)}>
          <SamplePlayer sample={sample} trigger={isPlaying && note === currentStep && currentSequence && currentSequence.includes(note)} audioContext={audioContext} />
        </Step>
      )}
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(
  withHandlers({
    handleSelection: props => index => {
      let selectedSteps = props.currentSequence ? props.currentSequence.slice() : []

      if (selectedSteps.includes(index)) {
        // REMOVE
        const entry = selectedSteps.indexOf(index)

        selectedSteps.splice(entry, 1)
      } else {
        // ADD
        selectedSteps = selectedSteps.concat(index)
      }

      props.onChange(selectedSteps, props.instrumentOwner)
    }
  }),
)

export default enhancer(Grid)
