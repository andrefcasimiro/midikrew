// @flow
import React from 'react'
import { default as Uploader } from 'components/JSONUploader'
import { default as Menu } from 'components/Navbar/_Menu'
import InstrumentsMenu from 'components/Navbar/InstrumentsMenu'
import Login from 'modals/Login'
import Join from 'modals/Join'
import firebase from 'global/firebase'
import {
  TiUser as LoginIcon,
  TiUserAdd as JoinIcon,
  TiEject as LogoutIcon,
//  TiDocumentAdd as NewProjectIcon,
  TiEdit as SaveProjectIcon,
  TiFolderOpen as LoadProjectIcon,
} from 'react-icons/ti'
import {
  exportProject, importProject
} from 'data/projects/helpers'

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
  component: () => <InstrumentsMenu />,
}

export const loggedInLinks = [
  projectLinks,
  instrumentsMenu,
  accountLinks,
]

export const loggedOutLinks = [
  instrumentsMenu,
  memberLinks,
]
