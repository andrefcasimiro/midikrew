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
  setFx: (key: string, type: 'increase' | 'decrease') => mixed,
  fx: {
    volume?: number,
    pitch?: number,
    reverb?: number,
  },
}

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

const StepOptions = ({ setFx, fx }: Props) => {
  return (
    <Wrapper>
      {tabs.map((tab, index) =>
        <Option key={index}>
          {tab.type === 'boolean'
            ? <>
                {fx[tab.key] === true
                  ? <CheckedIcon onClick={() => setFx(tabs[index].key, 'increase')}/>
                  : <UncheckedIcon onClick={() => setFx(tabs[index].key, 'decrease')}/>
                }
                <Field>{tabs[index].name}</Field>
              </>
            : <>
                <UpIcon onClick={() => setFx(tabs[index].key, 'increase')}/>
                <Field>{tabs[index].name}</Field>
                <Text>{fx && fx[tab.key] && (fx[tab.key]).toFixed(2)}</Text>
                <DownIcon onClick={() => setFx(tabs[index].key, 'decrease')}/>
              </>
          }
        </Option>
      )}
    </Wrapper>
  )
}

export default StepOptions
