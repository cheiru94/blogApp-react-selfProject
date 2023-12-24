import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

export let app: FirebaseApp; // app을 지역변수로 선언해준 후에 try catch문으로 할당을 한다.

// Your web app's Firebase configuration
const firebaseConfig = {
  // process.env.REACT_APP_ ~ 를 통해 환경 변수에서 값을 가져와 사용하기
  apiKey: process.env.REACT_APP_API_KEY, // 리엑트에서 사용할때는 반드시 REACT_APP_ 어노테이션을 붙여야 한다.
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_IT,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const firebase = initializeApp(firebaseConfig);

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app); // 파이어베이스에서 db 가져오기

export default firebase;
