// @refresh state
import { LogBox } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBD-AY2ntOc4CCNIA2ZRlIWKK98KaGpY68",
  authDomain: "pinder-2847a.firebaseapp.com",
  projectId: "pinder-2847a",
  storageBucket: "pinder-2847a.appspot.com",
  messagingSenderId: "305975241920",
  appId: "1:305975241920:web:ffc89b32c55c3c2d8fd125"
};
if(firebase.apps.length === 0){
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.firestore();

export { db };