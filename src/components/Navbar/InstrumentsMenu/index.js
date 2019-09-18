// @flow
import React from 'react'
import { TiFolderAdd as InstrumentIcon } from 'react-icons/ti'
import Menu from '../_Menu'
import Pack from 'modals/Pack'
import {
  junglePads,
  credits as junglePadsCredits,
} from 'data/packs/pads/junglePads'
import {
  awesomePads,
  credits as awesomePadsCredits,
} from 'data/packs/pads/awesomePads'
import {
  houseSynths,
  credits as houseSynthsCredits,
} from 'data/packs/synths/house_synths'
import {
  tr909,
  credits as tr909Credits,
} from 'data/packs/drums/tr909'
import {
  tr808,
  credits as tr808Credits,
} from 'data/packs/drums/tr808'
import {
  tr707,
  credits as tr707Credits,
} from 'data/packs/drums/tr707'

const InstrumentsMenu = () => (
  <Menu options={[
    {
      name: 'Drums',
      icon: InstrumentIcon,
      component: () => <Menu options={[
        // {
        //   name: 'Roland TR-505',
        //   onClick: () => console.log('teste'),
        // },
        // {
        //   name: 'Roland TR-606',
        //   onClick: () => console.log('teste'),
        // },
        {
          name: 'Roland TR-707',
          component: props => <Pack pack={tr707} credits={tr707Credits} {...props} />,
        },
        {
          name: 'Roland TR-808',
          component: props => <Pack pack={tr808} credits={tr808Credits} {...props} />,
        },
        {
          name: 'Roland TR-909',
          component: props => <Pack pack={tr909} credits={tr909Credits} {...props} />,
        },
      ]} />,
    },
    {
      name: 'Synths',
      icon: InstrumentIcon,
      component: () => <Menu options={[
        {
          name: 'House Synths',
          component: props => <Pack pack={houseSynths} credits={houseSynthsCredits} {...props} />,
        },
      ]}/>
    },
    {
      name: 'Pads',
      icon: InstrumentIcon,
      component: () => <Menu options={[
        {
          name: 'Awesome Pads',
          component: props => <Pack pack={awesomePads} credits={awesomePadsCredits} {...props} />,
        },
        {
          name: 'Jungle Pads',
          component: props => <Pack pack={junglePads} credits={junglePadsCredits} {...props} />,
        },
      ]}/>
    },
    // {
    //   name: 'Bass',
    //   icon: InstrumentIcon,
    //   component: () => <Menu options={[
    //     {
    //       name: 'Roland TB-303',
    //       onClick: () => console.log('teste'),
    //     },
    //     {
    //       name: 'Moog Bass',
    //       onClick: () => console.log('teste'),
    //     },
    //   ]} />,
    // },
  ]} />
)

export default InstrumentsMenu
