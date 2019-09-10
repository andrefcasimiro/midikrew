// @flow
import type { Component } from 'recompose'
import { loggedInLinks, loggedOutLinks } from './helpers'

export type Navlink = {
  name: string,
  component?: Component,
  to?: string,
  onClick?: Function,
  subLinks?: Array<Navlink>,
}

export default {
  applicationName: 'Midikrew',
  navLinks: {
    user: loggedInLinks,
    visitor: loggedOutLinks,
  },
}
