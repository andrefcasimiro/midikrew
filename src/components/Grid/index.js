// @flow
import React from 'react'
import { compose, type HOC, withHandlers, withStateHandlers, lifecycle, } from 'recompose'
import {
  Step,
} from './styled'

type Props = {|
  instrumentOwner: number,
  onChange: (sequence: Array<*>, instrumentID: number) => mixed,
  currentSequence: Array<*>,
  currentSequenceIndex: number,
|}

const Grid = ({
  handleSelection,
  currentSequence,
}) => {
  const generator = []
  for (let i = 0; i < 16; i++) {
    generator.push(i)
  }

  return (
    <React.Fragment>
      {generator.map((note) =>
        <Step active={currentSequence && currentSequence.includes(note)} key={note} index={note} onClick={() => handleSelection(note)} />
      )}
    </React.Fragment>
  )
}

const enhancer: HOC<*, Props> = compose(
  withHandlers({
    handleSelection: props => index => {
      let selectedSteps = props.currentSequence ? props.currentSequence.slice() : []

      console.log(selectedSteps)

      if (selectedSteps.includes(index)) {
        // REMOVE
        const entry = selectedSteps.indexOf(index)

        selectedSteps.splice(entry, 1)
      } else {
        // ADD
        selectedSteps = selectedSteps.concat(index)
      }

      console.log('selectedSteps: ', selectedSteps)

      props.onChange(selectedSteps, props.instrumentOwner)
    }
  }),
)

export default enhancer(Grid)
