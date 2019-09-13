// @flow
import React from 'react'
import {
  BPMIndicator,
} from './styled'

type Props = {|
  currentStep: number,
|}

const Bpm = ({
  currentStep,
}: Props) => {
  const generator = []
  for (let i = 0; i < 16; i++) {
    generator.push(i)
  }

  return (
    <React.Fragment>
      {generator.map((index) =>
        <BPMIndicator key={index} active={currentStep === index} />
      )}
    </React.Fragment>
  )
}

export default Bpm
