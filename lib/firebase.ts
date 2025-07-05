
// Import the functions you need from the SDKs you need
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5vuPEWHePkHS7IoT8WCXYgPJadyDJZbk",
  authDomain: "beboiler-2025.firebaseapp.com",
  projectId: "beboiler-2025",
  storageBucket: "beboiler-2025.firebasestorage.app",
  messagingSenderId: "689583058492",
  appId: "1:689583058492:web:ffae2ff484818c24a61d39"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export { auth, firestore as db };
