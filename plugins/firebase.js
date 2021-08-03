import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyArBDcvy4hp1mQ71VMyHz_n3UQT5JPEYmo",
        authDomain: "kintai-78ee3.firebaseapp.com",
        databaseURL: "https://kintai-78ee3-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "kintai-78ee3",
        storageBucket: "kintai-78ee3.appspot.com",
        messagingSenderId: "1080705386564",
        appId: "1:1080705386564:web:b4c53c0115a726879b1411"
    })
}

export default firebase