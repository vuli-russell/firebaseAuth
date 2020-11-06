import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAkSZPuy9TXxbIqaBypdNHiUGTkFkZ9b8I",
  authDomain: "testingauth-a56f4.firebaseapp.com",
  databaseURL: "https://testingauth-a56f4.firebaseio.com",
  projectId: "testingauth-a56f4",
  storageBucket: "testingauth-a56f4.appspot.com",
  messagingSenderId: "94033604885",
  appId: "1:94033604885:web:39a0329362a170229f791c",
  measurementId: "G-SH9P8FLG8Y"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;