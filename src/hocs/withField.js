// @flow
import React from 'react'
import { path } from 'ramda'
import type { Component } from 'recompose'
import { Field } from 'formik'

const handleBlur = props => () => {
  props.form.setFieldTouched(props.field.name, true)
}

const handleChange = props => event => {
  const value = !!(event.stopPropagation && event.preventDefault)
    ? event.target.value
    : event

  props.form.setFieldValue(props.field.name, value)
  props.form.setStatus({ ...props.form.status, error: null })

  if (typeof props.onChange === 'function') {
    props.onChange(event)
  }
}

type Added<Value> = {
  value: Value,
  onChange: Value => mixed,
}

function withField<Outter>(
  ComposedComponent: Component<{|
    ...$Exact<Outter>,
    ...$Exact<Added<*>>,
  |}>,
): Component<Outter> {
  return props => (
    <Field
      {...props}
      render={fieldProps => {
        const showError = path(["form", "status", "submitted"], fieldProps) || fieldProps.form.touched[fieldProps.field.name] === true
        const error = fieldProps.form.errors[fieldProps.field.name]

        return (
          <ComposedComponent
            {...props}
            {...fieldProps.field}
            onChange={handleChange({ ...props, ...fieldProps })}
            onBlur={handleBlur({ ...props, ...fieldProps })}
            error={showError && error}
          />
        )
      }}
    />
  )
}

export default withField
