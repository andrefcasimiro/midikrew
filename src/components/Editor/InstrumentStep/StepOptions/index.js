// @flow
import React from 'react'
import { Field, Text } from 'componentsStyled/Typography'
import {
  FaCaretSquareUp as UpIcon,
  FaCaretSquareDown as DownIcon,
} from 'react-icons/fa'
import {
  IoMdCheckbox as CheckedIcon,
  IoMdCheckboxOutline as UncheckedIcon,
} from 'react-icons/io'
import { Option, Wrapper } from './styled'

type Props = {
  increaseValue: (key: string) => mixed,
  decreaseValue: (key: string) => mixed,
  fx: {
    volume?: number,
    pitch?: number,
    reverb?: number,
  },
}



const StepOptions = ({ increaseValue, decreaseValue, fx }: Props) => {
  const tabs = [
    {
      name: 'Volume',
      key: 'volume',
      type: 'number',
    },
    {
      name: 'Pitch',
      key: 'pitch',
      type: 'number',
    },
    {
      name: 'Reverb',
      key: 'reverb',
      type: 'boolean',
    },
  ]

  return (
    <Wrapper>
      {tabs.map((tab, index) =>
        <Option key={index}>
          {tab.type === 'boolean'
            ? <>
                {fx && fx[tab.key] && fx[tab.key] === true
                  ? <CheckedIcon onClick={() => decreaseValue(tabs[index].key)}/>
                  : <UncheckedIcon onClick={() => increaseValue(tabs[index].key)}/>
                }
                <Field>{tabs[index].name}</Field>
              </>
            : <>
                <UpIcon onClick={() => increaseValue(tabs[index].key)}/>
                  <Field>{tabs[index].name}</Field>
                  <Text>{fx && fx[tab.key] && (fx[tab.key]).toFixed(2)}</Text>
                <DownIcon onClick={() => decreaseValue(tabs[index].key)}/>
              </>
          }

        </Option>
      )}
    </Wrapper>
  )
}

export default StepOptions
