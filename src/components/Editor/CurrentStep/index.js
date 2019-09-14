// @flow
import React from 'react'
import { StepIndicator } from './styled'

type Props = {|
  currentStep: number,
|}

const generator = []
for (let i = 0; i < 16; i++) {
  generator.push(i)
}

/**
 * Used to illustrate the current position of the sequencer at a given current step
 * @param {number} currentStep - The index of the current step of the sequence
 */
const CurrentStep = ({ currentStep }: Props) => (
  <>
    {generator.map((index) => <StepIndicator key={index} active={currentStep === index} />)}
  </>
)

export default CurrentStep
