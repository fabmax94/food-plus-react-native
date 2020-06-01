import firebase from 'firebase';
import { firebaseConfig } from './firebase-credentials.json';

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();
export const firebaseAuth = firebase.auth();
