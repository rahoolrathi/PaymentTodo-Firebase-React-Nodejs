// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB1U4SQDi4ISA2SsHSkopKPiCEi8TK84Y4",
  authDomain: "paymentremainderapp.firebaseapp.com",
  projectId: "paymentremainderapp",
  storageBucket: "paymentremainderapp.appspot.com",
  messagingSenderId: "388466062682",
  appId: "1:388466062682:web:98fa34786f2a96cb972f63",
  measurementId: "G-JN972X7PJ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Authentication instance
const messaging = getMessaging(app);
const generateToken = async () => {
  const premission = await Notification.requestPermission();
  console.log(premission);
};
export { auth, messaging, generateToken };
