import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDl1o1Q3bELfKNHwnCKFPM0U2NLSFznwNQ",
    authDomain: "gumroad-daae9.firebaseapp.com",
    projectId: "gumroad-daae9",
    storageBucket: "gumroad-daae9.appspot.com",
    messagingSenderId: "385083137697",
    databaseURL: "https://gumroad-daae9-default-rtdb.firebaseio.com",
    appId: "1:385083137697:web:b75eaf8255f93eb3ce5ae0",
  };

firebase.initializeApp(firebaseConfig);

// const checkUsers = () => {
//   const listRef = new Firebase(url);
// };

export const db = firebase.database();
export const dbRef = db.ref();


