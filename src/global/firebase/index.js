// @flow
import firebase from 'firebase'

// Config keys are exposed and sent from client side when working with Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1ZILKaDSKKBFxfaP7QRDfLeYa-XOg2pQ",
  authDomain: "midikrew.firebaseapp.com",
  databaseURL: "https://midikrew.firebaseio.com",
  projectId: "midikrew",
  storageBucket: "",
  messagingSenderId: "789909489903",
  appId: "1:789909489903:web:b1b54ae0bbd0a1fb84f31a"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export default firebase
