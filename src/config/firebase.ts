import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyAXKSCQU0jrYwIdVo2ou7GKhPB7q6YbKZw",
  authDomain: "plan-pals-b97a9.firebaseapp.com",
  projectId: "plan-pals-b97a9",
  storageBucket: "plan-pals-b97a9.firebasestorage.app",
  messagingSenderId: "960219490773",
  appId: "1:960219490773:web:cd4757fa9bcd847a19355c",
  measurementId: "G-M5XK7KFL88"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);