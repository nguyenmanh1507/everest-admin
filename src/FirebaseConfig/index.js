import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

import config from './config'

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: `${config.projectId}.firebaseapp.com`,
  databaseURL: `https://${config.databaseName}.firebaseio.com`,
  projectId: config.projectId,
  storageBucket: `${config.bucket}.appspot.com`,
  messagingSenderId: config.messagingSenderId
})

export const storage = firebase.storage()
export const db = firebase.firestore()
