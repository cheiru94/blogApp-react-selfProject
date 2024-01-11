import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

export let app: FirebaseApp; // app을 지역변수로 선언해준 후에 try catch문으로 할당을 한다.

/* Firebase 앱의 설정 정보를 담은 객체  : Firebase 환경설정 */
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
/* 이렇게 함으로써, 이 코드는 "app" 이름의 Firebase 앱이 항상 초기화되어 있음을 보장한다. */
try {
  app = getApp("app"); // getApp 메서드는 이미 초기화된 Firebase 앱의 인스턴스를 가져오는 데 사용
} catch (e) {
  app = initializeApp(firebaseConfig, "app"); // Firebase 앱을 생성하고 초기화하는 역할
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app); // 파이어베이스에서 db 가져오기

export default firebase;
