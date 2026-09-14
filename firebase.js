
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD_xmvwQIaCfeDxN2twWW-s-F77SVbWEnE",
  authDomain: "storyverse-8e60d.firebaseapp.com",
  projectId: "storyverse-8e60d",
  storageBucket: "storyverse-8e60d.firebasestorage.app",
  messagingSenderId: "433894304573",
  appId: "1:433894304573:web:3d93fcf3c6ea42c6653354",
  measurementId: "G-926547Y670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);