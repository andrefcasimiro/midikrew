// @flow
import React from 'react'
import styled from 'styled-components'
import StatefulModal from 'components/StatefulModal'
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

const projectLinks = {
  name: 'Project',
  component: () => <Menu options={[
      {
        name: 'New',
        icon: NewProjectIcon,
        onClick: () => console.log('...'),
      },
      {
        name: 'Save',
        icon: SaveProjectIcon,
        onClick: () => console.log('...'),
      },
      {
        name: 'Load',
        icon: LoadProjectIcon,
        onClick: () => console.log('...'),
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
