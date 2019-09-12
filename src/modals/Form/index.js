// @flow
import React from 'react'
import * as yup from 'yup'
import { compose, type HOC, withProps, branch } from 'recompose'
import withPost, { type Endpoint } from 'hocs/withPost'
import withForm from 'hocs/withForm'
import TextInput from 'components/Inputs/TextInput'
import { Submit } from 'componentsStyled/Buttons'
import type { Form as FormType } from 'data/forms/types'

type Props = {
  close: Function,
  form: FormType[],
  submitName: string,
  withPostEndpoint?: Endpoint,
  submitHandler?: Function,
}

/** A dynamic form that receives a list of fields and renders them with validation and a submit handler
 * @param {String} submitName - Then presentational name of the submit button. By default, it's set as 'Submit'
 * @param {FormType[]} form - The form object to be mapped both as jsx and as the dynamic schema
 * @param {Function} close - Used as callback to close the modal once the submit returns successfully
 * @param {Function} submitHandler - An alternative to using the withPost hoc injected submit function.
 */
const Form = ({ form, submitName = 'Submit', isSubmitting, ...props }) => {
  return (
    <React.Fragment>
      {form.map((field, index) =>
        <TextInput key={index} name={field.name} label={field.label} type={field.type} {...field} />
      )}

      <Submit type='submit' disabled={isSubmitting}>{submitName}</Submit>
    </React.Fragment>
  )
}

const arrangeValues = (values: Object, form: Array<FormType>) => {
  let input = values

  form.forEach((entry) => {
    let baseValue = values[entry.name]

    if (entry.dataType === 'array') {
      baseValue = !!baseValue ? baseValue.split(', ') : []
      baseValue = baseValue.map((b: string) => !b.startsWith('http') ? b.toLowerCase() : b)
    }

    input = {
      ...input,
      [entry.name]: baseValue,
    }
  })

  return input
}

const enhancer: HOC<*, Props> = compose(
  branch(props =>
    props.submitHandler
      ? null
      : withPost(props.withPostEndpoint)
  ),
  withProps(props => {
    if (!props.form) {
      return
    }

    // Build dynamic schema
    const customSchema = props.form.reduce((acc, field) => {
      // Is text or text separated by commas
      if (field.dataType === 'string' || field.dataType === 'array') {
        const base = yup.string().min(3)
        const validator = field.required ? base.required() : base.nullable()

        return acc.concat({
          [field.name]: validator,
        })
      }

      // Is number
      const base = yup.number().positive()
      const validator = field.required ? base.required() : base.nullable()

      return acc.concat({
        [field.name]: validator,
      })
    }, [])

    return {
      customSchema,
    }
  }),
  withForm({
    onSubmit: props => values => {
      const input = arrangeValues(values, props.form)

      if (props.submitHandler) {
        return props.submitHandler(input)
      }

      return props.submit(input)
    },
    onSuccess: props => result => {
      if (!result) {
        return
      }

      return props.close()
    },
  }),
)

export default enhancer(Form)
