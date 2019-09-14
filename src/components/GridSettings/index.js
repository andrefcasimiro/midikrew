// @flow
import React from 'react'
import { compose, type HOC, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import TRACK_ACTIONS from 'data/track/actions'
import { Field } from 'componentsStyled/Typography'
import {
  Menu,
  Input,
} from './styled'

const GridSettings = ({ bpm, handleBPM }) => (
  <Menu>
    <Field>BPM: </Field>
    <Input title='Set the current tempo of the song' type='number' value={bpm} onChange={handleBPM} />
  </Menu>
)

const mapStateToProps = state => ({
  bpm: state.track.bpm,
})

const mapDispatchToProps = {
  setBPM: TRACK_ACTIONS.setCurrentBPM,
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

export default enhancer(GridSettings)
