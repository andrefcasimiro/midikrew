// @flow
import React from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'global/firebase'
import appConfiguration, { type Navlink } from 'global/app'
import StatefulLink from 'components/StatefulLink'
import { Link, BoldLink } from 'componentsStyled/Typography'
import { Container, Spacer } from './styled'

// type Added = {
//   signInWithEmailAndPassword: (email: string, password: string) => void,
//   createUserWithEmailAndPassword: (email: string, password: string) => void,
//   signInWithGoogle: () => void,
//   signInWithFacebook: () => void,
//   signInWithGithub: () => void,
//   signInWithTwitter: () => void,
//   signInAnonymously: () => void,
//   signOut: () => void,
//   setError: (error: any) => void,
//   user?: firebase.User,
//   error?: firebase.FirebaseError,
// }

const Header = ({ user }) => {
  const navLinks = user ? appConfiguration.navLinks.user : appConfiguration.navLinks.visitor

  return (
    <React.Fragment>
      <Container>
        {user !== undefined &&
          <React.Fragment>
            <BoldLink href={'/'}>{(appConfiguration.applicationName).toUpperCase()}</BoldLink>
            {navLinks.map((navLink: Navlink, index) =>
              (!!navLink.to || !!navLink.onClick)
              ? <Link key={index} href={navLink.to || '#'} onClick={navLink.onClick || null}>
                  {navLink.name}
                </Link>
              : <StatefulLink key={index} component={navLink.component} data={user}>
                  <Link>{navLink.name}</Link>
                </StatefulLink>
            )}
          </React.Fragment>
        }
      </Container>
      <Spacer />
    </React.Fragment>
  )
}

export default withFirebaseAuth({
  providers: {},
  firebaseAppAuth: firebase.auth(),
})(Header)
