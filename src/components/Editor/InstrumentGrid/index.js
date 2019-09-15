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
}) => {
  const instrument = instruments.find(i => i.id === instrumentOwner)

  return (
    <React.Fragment>
      {generator.map(stepIndex => {
        return (
          <InstrumentStep
            key={stepIndex}
            index={stepIndex}
            instrument={instrument}
          />
        )
      })}
    </React.Fragment>
  )
}

type Props = {
  instrumentOwner: number,
}

const mapStateToProps = state => ({
  instruments: state.instrument.instruments,
})

const mapDispatchToProps = {}

const enhancer: HOC<*, Props> = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhancer(InstrumentGrid)
