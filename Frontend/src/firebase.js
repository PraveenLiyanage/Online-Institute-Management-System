import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfN9SpVJYP5gH4IY7ilpOJknn0Hcc2Llg",
  authDomain: "modulevdeo.firebaseapp.com",
  projectId: "modulevdeo",
  storageBucket: "modulevdeo.appspot.com",
  messagingSenderId: "9900189263",
  appId: "1:9900189263:web:5b99aa856b12c93ce52c3a",
  measurementId: "G-1WT39VF3YC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);