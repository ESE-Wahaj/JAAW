import { getAuth } from "firebase/auth";
import {  initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import React, { createContext, useContext } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAqymeh8Dz48ancHhGvTrmva57p9f6bBmM",
  authDomain: "zome-sda.firebaseapp.com",
  projectId: "zome-sda",
  storageBucket: "zome-sda.appspot.com",
  messagingSenderId: "986627529821",
  appId: "1:986627529821:web:0ad1372381ccbd0b90c1b4"
};



const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);




export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
