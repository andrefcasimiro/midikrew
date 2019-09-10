// @flow
import React, { Component } from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import Header from 'components/Header'
import GlobalStyle from 'global/global-styles'
import firebase from 'global/firebase'
import Home from 'pages/Home'

type Props = {
  signInWithEmailAndPassword: (email: string, password: string) => void,
  createUserWithEmailAndPassword: (email: string, password: string) => void,
  signInWithGoogle: () => void,
  signInWithFacebook: () => void,
  signInWithGithub: () => void,
  signInWithTwitter: () => void,
  signInAnonymously: () => void,
  signOut: () => void,
  setError: (error: any) => void,
  user?: firebase.User,
  error?: firebase.FirebaseError,
}

class App<P: Props> extends Component <P, {}> {

  render() {
    const {
      user,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
    } = this.props

    return (
      <React.Fragment>
        <GlobalStyle />
        <Header />
        <Home />
      </React.Fragment>
    )
  }
}

export default withFirebaseAuth({
  providers: {

  },
  firebaseAppAuth: firebase.auth(),
})(App)
