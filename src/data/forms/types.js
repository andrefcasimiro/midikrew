// @flow
import type { Component } from 'recompose'

export type Form = {
  // The key of the value
  name: string,
  // Label to be rendered above the form field
  label: string,
  // The input type of the input component
  type: 'text' | 'number' | 'select',
  // If input has specific instructions, specifiy them using the description property
  description?: string,
  // Useful for doing logic before submitting the form
  dataType: 'string' | 'number' | 'array',
  // A JSX Icon to render near the field label
  icon?: Component,
  // Is field obligatory?
  required?: boolean,
}
