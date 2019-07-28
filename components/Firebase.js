import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcKzST0JYkfDpaW7DfNwiaEjRRxsVXd-4",
    authDomain: "tuesday-216dd.firebaseapp.com",
    databaseURL: "https://tuesday-216dd.firebaseio.com",
    projectId: "tuesday-216dd",
    storageBucket: "tuesday-216dd.appspot.com",
    messagingSenderId: "992306345712",
    appId: "1:992306345712:web:d3ec0e6a8096e56a"
}

export default class Firebase {
    static auth;
    static store;
    static database;

    static registrationInfo = {
        first_name:'',
        last_name:'',
        email:'',
        birthday:''
    }

    static init()
      {
          firebase.initializeApp(firebaseConfig);
          Firebase.auth = firebase.auth();
          Firebase.store = firebase.firestore();
          Firebase.database = firebase.database();
          
      }  
}