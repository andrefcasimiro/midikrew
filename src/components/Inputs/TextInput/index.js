// @flow
import React from "react"
import withField from 'hocs/withField'
import {
  InputWrap,
  Label,
  Description,
  Error,
  StyledInput,
} from './styled'

const TextInput = ({ name, label, value, onChange, onBlur, error, ...props }) => (
  <InputWrap>
    <Label>
      {label}
      {props.icon && <props.icon />}
      {props.description && <Description>({props.description})</Description>}
    </Label>
    <StyledInput
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      type={props.type}
    />
    {error && typeof error === 'string' && <Error>{error}</Error>}
  </InputWrap>
)

export default withField(TextInput)
