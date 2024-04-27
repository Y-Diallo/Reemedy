// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2yPulFYsErvN74Eoc7OjbIRX1V5p6Lk0",
  authDomain: "reemedy-backend.firebaseapp.com",
  projectId: "reemedy-backend",
  storageBucket: "reemedy-backend.appspot.com",
  messagingSenderId: "1004649530095",
  appId: "1:1004649530095:web:40dfe5d368f6b3f4b5511a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getDatabase(app);
// export const analytics = getAnalytics(app);
// export const functions = getFunctions(app);
// export const storage = getStorage(app);
// export const enrollInEvent = httpsCallable(functions, 'enrollInEvent');
// export const unenrollInEvent = httpsCallable(functions, 'unenrollInEvent');
// export const signUp = httpsCallable(functions, 'signUp');
// export const createEvent = httpsCallable(functions, 'createEvent');
// export const deleteEvent = httpsCallable(functions, 'deleteEvent');