// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, type HOC } from 'recompose'
import InstrumentStep from '../InstrumentStep'

const generator = []
for (let i = 0; i < 16; i++) {
  generator.push(i)
}

const InstrumentGrid = ({
  instruments, // from redux
  instrumentOwner,
  currentStep,
}) => {
  const instrument = instruments.find(i => i.id === instrumentOwner)

  // Should only generate once. Find a way to remove currentStep from react state and pass it to instrumentStep
  console.log('re rendering')
  return (
    <React.Fragment>
      {generator.map(stepIndex => {
        return (
          <InstrumentStep
            key={stepIndex}
            index={stepIndex}
            instrument={instrument}
            currentStep={currentStep}
          />
        )
      })}
    </React.Fragment>
  )
}

type Props = {
  instrumentOwner: number,
  currentStep: number,
}

const mapStateToProps = state => ({
  currentSequence: state.track.currentSequence,
  instruments: state.instrument.instruments,
})

const mapDispatchToProps = {}

const enhancer: HOC<*, Props> = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhancer(InstrumentGrid)
