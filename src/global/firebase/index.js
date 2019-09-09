// @flow
import firebase from 'firebase'

// Config keys are exposed and sent from client side when working with Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDqKgA_qV6OGvaNh4Klm-J7dDAjQ51YuCI',
  authDomain: 'movie-discussion-app.firebaseapp.com',
  databaseURL: 'https://movie-discussion-app.firebaseio.com',
  projectId: 'movie-discussion-app',
  storageBucket: '',
  messagingSenderId: '512588117731',
  appId: '1:512588117731:web:f5c9720f3754668ada77d6'
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export default firebase
