// @flow
import React from 'react'
import { compose, type HOC } from 'recompose'
import { connect } from 'react-redux'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import type { Instrument } from 'data/instrument/types'
import { IconButton } from 'componentsStyled/Buttons'
import {
  GoDiffAdded as PlusIcon,
  GoDiffRemoved as RemoveIcon,
} from 'react-icons/go'
import {
  Menu,
} from './styled'

const generator = (): Instrument => ({
  id: `instr-${Date.now()}`,
  name: 'Instrument',
  samplePath: '',
  sampleSource: undefined,
  sequences: [],
})

const InstrumentsManager = ({ addInstrument, removeInstrument }) => {

  return (
    <Menu>
      <IconButton>
        <PlusIcon title='Add a new instrument' onClick={() => addInstrument(generator()) }/>
      </IconButton>
      <IconButton>
        <RemoveIcon title='Remove an existing instrument' onClick={removeInstrument} />
      </IconButton>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    instruments: state.instruments,
  }
}

const mapDispatchToProps = {
  addInstrument: INSTRUMENT_ACTIONS.addInstrument,
  removeInstrument: INSTRUMENT_ACTIONS.removeInstrument,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhancer(InstrumentsManager)
