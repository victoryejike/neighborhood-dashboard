import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASCWZgSSU0l4QHN6w5Riub9rr9eWv-KEo",
  authDomain: "neighborhood-37985.firebaseapp.com",
  projectId: "neighborhood-37985",
  storageBucket: "neighborhood-37985.appspot.com",
  messagingSenderId: "913159918679",
  appId: "1:913159918679:web:d822b1d8a61e3a79a1bf12"
};

export const createUserProfileDocument = async (user) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt
      });
    } catch (error) {
      console.log("Error Creating User", error.message);
    }
  }
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const authentication = firebase.auth();

export default db;
