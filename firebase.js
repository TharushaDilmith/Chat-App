import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDn1EGIaEYe1UuNZLOxGddvX41DqXJFzAQ",
    authDomain: "signal-clone-c44f4.firebaseapp.com",
    projectId: "signal-clone-c44f4",
    storageBucket: "signal-clone-c44f4.appspot.com",
    messagingSenderId: "990753927501",
    appId: "1:990753927501:web:16595e9e18c4b25770c704"
  };

  let app;

  if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
  }
  else{
    app= firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db,auth};