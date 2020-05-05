import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';

const {
  KEY,
  DOMAIN,
  DATABASE,
  PROJECT_ID,
  STORAGE_BUCKET,
  SENDER_ID,
  APP_ID,
} = firebaseConfig;

const app = firebase.initializeApp({
  apiKey: KEY,
  authDomain: DOMAIN,
  databaseURL: DATABASE,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID
});

export default app;