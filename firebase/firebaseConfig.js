// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHauOncLGYzgHjGr9JgpcrKDB_QfY92ss",
  authDomain: "restaurant-60a9a.firebaseapp.com",
  projectId: "restaurant-60a9a",
  storageBucket: "restaurant-60a9a.appspot.com",
  messagingSenderId: "779954152996",
  appId: "1:779954152996:web:22afdd12df87326a3e1ab1",
  measurementId: "G-GPZT5V7PC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google =  new GoogleAuthProvider();
const facebook =  new FacebookAuthProvider();
const db = getFirestore();

export{
    app,
    google,
    facebook,
    db
}

// import { initializeApp } from 'firebase/app';
// import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// import {getFirestore} from 'firebase/firestore';

// //firebasev9 prj en firebase.com
// const firebaseConfig = {
//   apiKey: "AIzaSyCwmQMmRT6ke4JGbw9E-zxN9oClR5yp-9M",
//   authDomain: "login2-33276.firebaseapp.com",
//   projectId: "login2-33276",
//   storageBucket: "login2-33276.appspot.com",
//   messagingSenderId: "270101613027",
//   appId: "1:270101613027:web:38e1a18b25581cee8df8d6"
// };
// const app = initializeApp(firebaseConfig);
// const google =  new GoogleAuthProvider();
// const facebook =  new FacebookAuthProvider();
// const db = getFirestore();

// export{
//     app,
//     google,
//     facebook,
//     db
// }