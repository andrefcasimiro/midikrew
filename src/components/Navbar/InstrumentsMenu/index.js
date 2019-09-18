// @flow
import React from 'react'
import { TiFolderAdd as InstrumentIcon } from 'react-icons/ti'
import Menu from '../_Menu'
import Pack from 'modals/Pack'
import {
  junglePads,
} from 'data/audio/junglePads'
import {
  awesomePads,
} from 'data/audio/awesomePads'
import {
  houseSynths,
} from 'data/packs/synths/house_synths'
import {
  tr909,
} from 'data/packs/drums/tr909'
import {
  tr707,
} from 'data/packs/drums/tr707'
import {
  loader,
} from 'data/packs/helpers'

const InstrumentsMenu = () => (
  <Menu options={[
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
          component: props => <Pack pack={tr707} {...props} />,
        },
        {
          name: 'Roland TR-808',
          onClick: () => console.log('teste'),
        },
        {
          name: 'Roland TR-909',
          component: props => <Pack pack={tr909} {...props} />,
        },
      ]} />,
    },
    {
      name: 'Synths',
      icon: InstrumentIcon,
      component: () => <Menu options={[
        {
          name: 'House Synths',
          component: props => <Pack pack={houseSynths} {...props} />,
        },
      ]}/>
    },
    {
      name: 'Pads',
      icon: InstrumentIcon,
      component: () => <Menu options={[
        {
          name: 'Awesome Pads',
          onClick: () => loader(awesomePads),
        },
        {
          name: 'Jungle Pads',
          onClick: () => loader(junglePads),
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
  ]} />
)

export default InstrumentsMenu
