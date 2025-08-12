// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import specific functions

const firebaseConfig = {
  apiKey: "AIzaSyBj7uzQr2wZfnZqpisZgXBT3-wp4V21Xco",
  authDomain: "new-project-5dc16.firebaseapp.com",
  projectId: "new-project-5dc16",
  storageBucket: "new-project-5dc16.firebasestorage.app",
  messagingSenderId: "100330142236",
  appId: "1:100330142236:web:1568bf4153972179347dd9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase storage

export { storage, ref, uploadBytes, getDownloadURL };
