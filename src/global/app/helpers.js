// @flow
import React from 'react'
import styled from 'styled-components'
import StatefulModal from 'components/StatefulModal'
import { default as Uploader } from 'components/JSONUploader'
import theme from 'global/theme'
import Login from 'modals/Login'
import Join from 'modals/Join'
import firebase from 'global/firebase'
import {
  TiUser as LoginIcon,
  TiUserAdd as JoinIcon,
  TiEject as LogoutIcon,
  TiFolderAdd as InstrumentIcon,
  TiDocumentAdd as NewProjectIcon,
  TiEdit as SaveProjectIcon,
  TiFolderOpen as LoadProjectIcon,
} from 'react-icons/ti'
import {
  junglePads,
} from 'data/audio/junglePads'
import {
  loadPack,
} from 'data/audio/helpers'
import {
  reduxStore
} from '../../index'
import INSTRUMENT_ACTIONS from 'data/instrument/actions'
import TRACK_ACTIONS from 'data/track/actions'
import { loadSample } from 'data/audio/helpers'

const Li = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${theme.colors.monicastro.blue};
  }
`

const Menu = ({ options }) => {
  return (
    <ul>
      {options.map((option, index) => option.onClick
        ? <Li key={index} onClick={option.onClick}>{option.icon && <option.icon/>} {option.name}</Li>
        : <Li key={index}>
            <StatefulModal title={option.name} component={option.component}>{option.icon && <option.icon/>} {option.name}</StatefulModal>
          </Li>
      )}
    </ul>
  )
}

const importProject = json => {
  const file = JSON.parse(json)

  // Set BPM
  reduxStore.dispatch(
    TRACK_ACTIONS.setCurrentBPM(file.bpm)
  )


  // Set Number Of Sequences
  for (let i = 1; i < file.sequences.length; i++) {
    reduxStore.dispatch(
      TRACK_ACTIONS.addSequence()
    )
  }

  // Set Instruments (For Each Instrument, we need to load Sample)
  var audioContext = reduxStore.getState().track.audioContext

  // CLEAN ALL INSTRUMENTS BEFORE UPLOADING SAVED ONES!
  reduxStore.dispatch(
    INSTRUMENT_ACTIONS.clearAll()
  )

  file.instruments.instruments.forEach(instrument => {
    loadSample(instrument.samplePath, audioContext, 1, 1, sampleLoaded => {
      const returnedInstrument = {
        ...instrument,
        sampleSource: sampleLoaded,
      }

      reduxStore.dispatch(
        INSTRUMENT_ACTIONS.addInstrument(returnedInstrument)
      )
    })
  })

}

const exportProject = () => {
  const instruments = reduxStore.getState().instrument
  const bpm = reduxStore.getState().track.bpm
  const sequences = reduxStore.getState().track.sequences

  const config = {
    instruments,
    bpm,
    sequences,
  }

  let encoded = JSON.stringify(config)
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(encoded);

  let exportFileDefaultName = `midikrew-${Date.now()}.json`;

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}


const projectLinks = {
  name: 'Project',
  component: () => <Menu options={[
      // {
      //   name: 'New',
      //   icon: NewProjectIcon,
      //   onClick: () => console.log('...'),
      // },
      {
        name: 'Save',
        icon: SaveProjectIcon,
        onClick: () => exportProject(),
      },
      {
        name: 'Load',
        icon: LoadProjectIcon,
        component: () => <Uploader callback={content => {
          importProject(content)
        }} />,
      },
    ]} />,
}

const accountLinks = {
  name: 'Account',
  component: () => <Menu options={[
      {
        name: 'Log out',
        icon: LogoutIcon,
        onClick: () => firebase.auth().signOut(),
      },
    ]} />,
}

const memberLinks = {
  name: 'Access',
  component: () => <Menu options={[
      {
        name: 'Login',
        icon: LoginIcon,
        component: props => <Login {...props} />,
      },
      {
        name: 'Join',
        icon: JoinIcon,
        component: props => <Join {...props} />,
      },
    ]} />,
}

const instrumentsMenu = {
  name: 'Instruments',
  component: () => <Menu options={[
      {
        name: 'Drums',
        icon: InstrumentIcon,
        component: () => <Menu options={[
          {
            name: 'Roland TR-505',
            onClick: () => console.log('teste'),
          },
          {
            name: 'Roland TR-606',
            onClick: () => console.log('teste'),
          },
          {
            name: 'Roland TR-707',
            onClick: () => console.log('teste'),
          },
          {
            name: 'Roland TR-808',
            onClick: () => console.log('teste'),
          },
          {
            name: 'Roland TR-909',
            onClick: () => console.log('teste'),
          },
        ]} />,
      },
      {
        name: 'Pads',
        icon: InstrumentIcon,
        component: () => <Menu options={[
          {
            name: 'Jungle Pads',
            onClick: () => loadPack(junglePads),
          },
        ]}/>
      },
      {
        name: 'Bass',
        icon: InstrumentIcon,
        component: () => <Menu options={[
          {
            name: 'Roland TB-303',
            onClick: () => console.log('teste'),
          },
          {
            name: 'Moog Bass',
            onClick: () => console.log('teste'),
          },
        ]} />,
      },
    ]} />,
}

export const loggedInLinks = [
  projectLinks,
  instrumentsMenu,
  accountLinks,
]

export const loggedOutLinks = [
  memberLinks,
]
