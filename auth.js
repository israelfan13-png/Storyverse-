const firebaseConfig = {
  apiKey: "AIzaSyD_xmvwQIaCfeDxN2twWW-s-F77SVbWEnE",
  authDomain: "storyverse-8e60d.firebaseapp.com",
  databaseURL: "https://storyverse-8e60d-default-rtdb.firebaseio.com",
  projectId: "storyverse-8e60d",
  storageBucket: "storyverse-8e60d.firebasestorage.app",
  messagingSenderId: "433894304573",
  appId: "1:433894304573:web:3d93fcf3c6ea42c6653354",
  measurementId: "G-926547Y670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth(app);


// Get the login form
const loginForm = document.getElementById("loginForm");


// Listen for login
loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  message.textContent = "Logging in...";

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    message.textContent = "Login successful!";

    console.log("Logged in user:", user);

    // Send user to the homepage
    window.location.href = "index.html";

  } catch (error) {

    console.error(error);

    if (error.code === "auth/invalid-credential") {
      message.textContent = "Incorrect email or password.";
    }

    else if (error.code === "auth/user-not-found") {
      message.textContent = "No account exists with this email.";
    }

    else if (error.code === "auth/wrong-password") {
      message.textContent = "Incorrect password.";
    }

    else if (error.code === "auth/invalid-email") {
      message.textContent = "Please enter a valid email address.";
    }

    else {
      message.textContent = "Login failed. Please try again.";
    }
  }

});