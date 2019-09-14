// @flow
import React from 'react'
import {
  TiMail as MailIcon,
  TiKeyOutline as PasswordIcon
} from 'react-icons/ti'
import { compose, type HOC } from 'recompose'
import firebase from 'global/firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import type { Form as FormType } from 'data/forms/types'
import { Text } from 'componentsStyled/Typography'
import Form from '../Form'

type Props = {
  close: Function,
}

const form: FormType[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: MailIcon,
    dataType: 'string',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: PasswordIcon,
    dataType: 'string',
    required: true,
  },
]

// type Props = {
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

const Login = ({ close, user, signInWithEmailAndPassword, error }) => {
  const submitHandler = (input) => {
    const email = input.email
    const password = input.password

    return signInWithEmailAndPassword(email, password)
  }

  return (
    <>
      <Form close={close} submitName='Login' form={form} submitHandler={submitHandler} />
      {error &&
        <React.Fragment>
          <Text error margin={`1.5rem 0 0 0`}><strong>Error:</strong></Text>
          <Text error margin={`0.5rem 0 0 0`}>{error}</Text>
        </React.Fragment>
      }
    </>
  )
}

const enhancer: HOC<*, Props> = compose(
  withFirebaseAuth({
    providers: {

    },
    firebaseAppAuth: firebase.auth(),
  }),
)

export default enhancer(Login)
