import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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

// Initialize Authentication
const auth = getAuth(app);


// Get login form
const loginForm = document.getElementById("loginForm");


// Listen for login
loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
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

        console.log("Logged in user:", user);

        message.textContent = "Login successful!";

        // Go to homepage
        window.location.href = "index.html";

    } catch (error) {

        console.error("Login error:", error);

        if (error.code === "auth/invalid-credential") {

            message.textContent = "Incorrect email or password.";

        } 
        else if (error.code === "auth/invalid-email") {

            message.textContent = "Please enter a valid email address.";

        } 
        else if (error.code === "auth/user-disabled") {

            message.textContent = "This account has been disabled.";

        } 
        else if (error.code === "auth/too-many-requests") {

            message.textContent = "Too many attempts. Please try again later.";

        } 
        else {

            message.textContent = "Login failed: " + error.message;

        }

    }

});