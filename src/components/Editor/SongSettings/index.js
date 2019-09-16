// @flow
import React from 'react'
import { compose, type HOC, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { IconButton } from 'componentsStyled/Buttons'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import TRACK_ACTIONS from 'data/track/actions'
import { Field } from 'componentsStyled/Typography'
import {
  MdContentCopy as CopyIcon,
  MdContentPaste as PasteIcon,
} from 'react-icons/md'
import {
  Menu,
  Input,
} from './styled'

/**
 * Allows user to set the tempo of the song
 * @param {number} bpm - The base tempo of the song (comes from Redux)
 * @param {Function} setBPM - The dispatcher to update the bpm value in our redux store
 */

const SongSettings = ({ bpm, handleBPM, currentSequence, copySequence, pasteSequence }) => (
  <Menu>
    <IconButton onClick={() => copySequence(currentSequence)}><CopyIcon /></IconButton>
    <IconButton onClick={() => pasteSequence(currentSequence)}><PasteIcon /></IconButton>

    &nbsp;

    <Field>BPM: </Field>
    <Input title='Set the current tempo of the song' type='number' value={bpm} onChange={handleBPM} />
  </Menu>
)

const mapStateToProps = state => ({
  bpm: state.track.bpm,
  currentSequence: state.track.currentSequence,
})

const mapDispatchToProps = {
  setBPM: TRACK_ACTIONS.setCurrentBPM,
  copySequence: INSTRUMENT_ACTIONS.copySequence,
  pasteSequence: INSTRUMENT_ACTIONS.pasteSequence,
}

const enhancer: HOC<*, {}> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleBPM: props => event => {
      const v = event.target.value

      props.setBPM(v)
    }
  })
)

export default enhancer(SongSettings)
