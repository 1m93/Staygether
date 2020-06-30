import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAbCnEAIhogmtnPOSOp5qkIgqGhoCdfkMM",
    authDomain: "staygether-8c044.firebaseapp.com",
    databaseURL: "https://staygether-8c044.firebaseio.com",
    projectId: "staygether-8c044",
    storageBucket: "staygether-8c044.appspot.com",
    messagingSenderId: "125929216314",
    appId: "1:125929216314:web:ffab3ca9c2308210469803",
    measurementId: "G-GE5CBBJ3CY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;