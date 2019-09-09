// @flow
import React from 'react'
import { IoIosArrowDown as ArrowDownIcon } from 'react-icons/io'
import appConfiguration, { type Navlink } from 'global/app'
import { Title, Link } from 'componentsStyled/Typography'
import { Container, Spacer } from './styled'

const Header = () => {

  return (
    <React.Fragment>
      <Container>
        <Title>{appConfiguration.applicationName}</Title>
        {appConfiguration.navLinks.user.map((navLink: Navlink, index) =>
          <Link key={index} to={navLink.to || '#s'} onClick={navLink.onClick || null}>
            {navLink.name}
            {navLink.onClick && <ArrowDownIcon />}
          </Link>
        )}
      </Container>
      <Spacer />
    </React.Fragment>
  )
}

export default Header
