import firebase from "firebase/app"; // 파이어베이스 기능 불러오기
import "firebase/firestore"; // 파이어베이스의 파이어스토어 기능 불러오기
const firebaseConfig = {
    apiKey: "AIzaSyAS3tvlDjasVEvwb7R2pcoDdsfDpTNqPFE",
    authDomain: "my-todo1-9079d.firebaseapp.com",
    projectId: "my-todo1-9079d",
    storageBucket: "my-todo1-9079d.appspot.com",
    messagingSenderId: "729638443139",
    appId: "1:729638443139:web:5b95ae19d79a4a14e463b6",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
