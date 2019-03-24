import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyAQMY6sFbrmfe0Qbu925EUxEhFiKYwnNR0",
    authDomain: "atendimento-9d6a4.firebaseapp.com",
    databaseURL: "https://atendimento-9d6a4.firebaseio.com",
    projectId: "atendimento-9d6a4",
    storageBucket: "atendimento-9d6a4.appspot.com",
    messagingSenderId: "696560631149"
};

const devConfig = {
    apiKey: "AIzaSyAQMY6sFbrmfe0Qbu925EUxEhFiKYwnNR0",
    authDomain: "atendimento-9d6a4.firebaseapp.com",
    databaseURL: "https://atendimento-9d6a4.firebaseio.com",
    projectId: "atendimento-9d6a4",
    storageBucket: "atendimento-9d6a4.appspot.com",
    messagingSenderId: "696560631149"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
