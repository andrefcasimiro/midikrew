// @flow
import type { Form } from 'data/forms/types'

export const addMovie: Form[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    dataType: 'string',
    required: true,
  },
  // Generic
  {
    name: 'year',
    label: 'Year',
    type: 'number',
    dataType: 'number',
    required: true,
  },
  {
    name: 'countries',
    label: 'Countries',
    type: 'text',
    description: 'Separate by commas for multiple countries.',
    dataType: 'array',
    required: true,
  },
  // Meta
  {
    name: 'plot',
    label: 'Plot',
    type: 'text',
    dataType: 'string',
    required: true,
  },
  {
    name: 'genre',
    label: 'Genre',
    type: 'text',
    description: 'Separate by commas for multiple genres.',
    dataType: 'array',
    required: true,
  },
  // Technical
  {
    name: 'runtime',
    label: 'Runtime',
    type: 'number',
    dataType: 'number',
  },
  {
    name: 'awards',
    label: 'Awards',
    type: 'text',
    description: 'Separate by commas for multiple awards.',
    dataType: 'array',
  },
  // Cast
  {
    name: 'directors',
    label: 'Directors',
    type: 'text',
    description: 'Separate by commas for multiple directors.',
    dataType: 'array',
    required: true,
  },
  {
    name: 'writers',
    label: 'Writers',
    type: 'text',
    description: 'Separate by commas for multiple writers.',
    dataType: 'array',
  },
  {
    name: 'actors',
    label: 'Actors',
    type: 'text',
    description: 'Separate by commas for multiple actors.',
    dataType: 'array',
    required: true,
  },
  // Media
  {
    name: 'posters',
    label: 'Posters',
    type: 'text',
    description: 'Separate by commas for multiple posters.',
    dataType: 'array',
    required: true,
  },
  {
    name: 'images',
    label: 'Images',
    type: 'text',
    description: 'Separate by commas for multiple images.',
    dataType: 'array',
  },
  {
    name: 'videos',
    label: 'Videos',
    type: 'text',
    description: 'Separate by commas for multiple videos.',
    dataType: 'array',
  },
]
