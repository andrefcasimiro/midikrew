// @flow
import React from 'react'
import styled from 'styled-components'
import theme from 'global/theme'

const Li = styled.li`
  cursor: pointer;

  &:hover {
    color: ${theme.colors.monicastro.blue};
  }
`

const Menu = ({ options }) => {
  return (
    <ul>
      {options.map((option, index) => <Li key={index} onClick={option.onClick}>{option.name}</Li>)}
    </ul>
  )
}

const projectLinks = {
  name: 'Project',
  component: () => <Menu options={[
      {
        name: 'New Project',
        onClick: () => console.log('...'),
      },
      {
        name: 'Save Project',
        onClick: () => console.log('...'),
      },
      {
        name: 'Load Project',
        onClick: () => console.log('...'),
      },
    ]} />,
}

const settingLinks = {
  name: 'Settings',
  component: () => <Menu options={[
      {
        name: 'Set tempo',
        onClick: () => console.log('...'),
      },
      {
        name: 'Set number of steps',
        onClick: () => console.log('...'),
      },
      {
        name: 'Clear sequence',
        onClick: () => console.log('...'),
      },
    ]} />,
}

const accountLinks = {
  name: 'Account',
  component: () => <Menu options={[
      {
        name: 'Manage projects',
        onClick: () => console.log('...'),
      },
      {
        name: 'Manage account details',
        onClick: () => console.log('...'),
      },
      {
        name: 'Log out',
        onClick: () => console.log('log out'),
      },
    ]} />,
}

const memberLinks = {
  name: 'Access',
  component: () => <Menu options={[
      {
        name: 'Login',
        onClick: () => console.log('...'),
      },
      {
        name: 'Join',
        onClick: () => console.log('log out'),
      },
    ]} />,
}

export const loggedInLinks = [
  projectLinks,
  settingLinks,
  accountLinks,
]

export const loggedOutLinks = [
  memberLinks,
]