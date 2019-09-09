// @flow

export type Navlink = {
  name: string,
  onClick?: Function,
  to?: string,
  subLinks?: Array<Navlink>,
}

const projectLinks = {
  name: 'Project',
  onClick: () => { console.log('Clicked on Project') },
  subLinks: [
    {
      name: 'New Project',
      onClick: () => { console.log('New action.')}
    },
    {
      name: 'Save this project',
      onClick: () => { console.log('Save action.')}
    },
    {
      name: 'Load a saved project',
      onClick: () => { console.log('Load action.')}
    },
  ],
}

const settingLinks = {
  name: 'Settings',
  onClick: () => { console.log('Opened up Settings') },
}

const loggedInLinks = [
  projectLinks,
  settingLinks,
  {
    name: 'Account',
    onClick: () => { console.log('Opened up Account') },
  },
  {
    name: 'Log out',
    onClick: () => { console.log('Clicked Log out') },
  },
]

const loggedOutLinks = [
  projectLinks,
  settingLinks,
  {
    name: 'Login',
    onClick: () => { console.log('Clicked Log In ') },
  }
]


export default {
  applicationName: 'Midikrew',
  navLinks: {
    user: loggedInLinks,
    visitor: loggedOutLinks,
  },
}
