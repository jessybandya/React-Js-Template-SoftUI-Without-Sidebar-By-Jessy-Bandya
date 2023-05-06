import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgWa7CU2NpQsL6iyc5B_oT5tJvlHxk8YI",
    authDomain: "electrika-store.firebaseapp.com",
    projectId: "electrika-store",
    storageBucket: "electrika-store.appspot.com",
    messagingSenderId: "894259997674",
    appId: "1:894259997674:web:44052da5fc23a581372093",
    measurementId: "G-WLYKX83X6W"
  };
  
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};