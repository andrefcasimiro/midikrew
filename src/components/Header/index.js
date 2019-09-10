// @flow
import React from 'react'
import appConfiguration, { type Navlink } from 'global/app'
import StatefulLink from 'components/StatefulLink'
import { Link, BoldLink } from 'componentsStyled/Typography'
import { Container, Spacer } from './styled'

const Header = () => {
  return (
    <React.Fragment>
      <Container>
        <BoldLink href={'/'}>{(appConfiguration.applicationName).toUpperCase()}</BoldLink>
        {appConfiguration.navLinks.user.map((navLink: Navlink, index) =>
          (!!navLink.to || !!navLink.onClick)
          ? <Link key={index} href={navLink.to || '#s'} onClick={navLink.onClick || null}>
              {navLink.name}
            </Link>
          : <StatefulLink key={index} component={navLink.component}>
              <Link>{navLink.name}</Link>
            </StatefulLink>
        )}
      </Container>
      <Spacer />
    </React.Fragment>
  )
}

export default Header
