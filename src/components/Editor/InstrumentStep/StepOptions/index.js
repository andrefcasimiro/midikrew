// @flow
import React from 'react'
import { lifecycle } from 'recompose'
import { Field } from 'componentsStyled/Typography'
import {
  FaCaretSquareUp as UpIcon,
  FaCaretSquareDown as DownIcon,
} from 'react-icons/fa'
import { Option, Wrapper } from './styled'

type Props = {
  increaseValue: (key: string) => mixed,
  decreaseValue: (key: string) => mixed,
}



const StepOptions = ({ increaseValue, decreaseValue }: Props) => {
  console.log('rerendering....')
  const tabs = [
    {
      name: 'Volume',
      key: 'volume',
    },
    {
      name: 'Pitch',
      key: 'pitch',
    },
    {
      name: 'Reverb',
      key: 'reverb',
    },
  ]
  return (
    <Wrapper>
      {tabs.map((tab, index) =>
        <Option key={index}>
          <UpIcon onClick={() => increaseValue(tabs[index].key)}/>
          <Field>{tabs[index].name}</Field>
          <DownIcon onClick={() => decreaseValue(tabs[index].key)}/>
        </Option>
      )}
    </Wrapper>
  )
}

export default lifecycle({
  componentDidMount() {
    console.log('did mount')
  }
})(StepOptions)
