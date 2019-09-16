// @flow
import firebase from 'firebase'

// Config keys are exposed and sent from client side when working with Firebase

const stagingKeys = {
  apiKey: "AIzaSyBstS-xh-C1cDB52ZwqXQcoJE0BShZJPa0",
  authDomain: "midikrew-staging.firebaseapp.com",
  databaseURL: "https://midikrew-staging.firebaseio.com",
  projectId: "midikrew-staging",
  storageBucket: "",
  messagingSenderId: "364995650869",
  appId: "1:364995650869:web:a3ce7c545a300ddb3b587c"
}

const productionKeys = {
  apiKey: "AIzaSyB1ZILKaDSKKBFxfaP7QRDfLeYa-XOg2pQ",
  authDomain: "midikrew.firebaseapp.com",
  databaseURL: "https://midikrew.firebaseio.com",
  projectId: "midikrew",
  storageBucket: "",
  messagingSenderId: "789909489903",
  appId: "1:789909489903:web:b1b54ae0bbd0a1fb84f31a"
}

const firebaseConfig = process.env.NODE_ENV === 'production'
  ? productionKeys
  : stagingKeys

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export default firebase
