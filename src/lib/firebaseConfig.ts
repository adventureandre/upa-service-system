// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAl8qo67cFeIO_vFGJMxmTHEjAm2y5BzZ4",
  authDomain: "upa-sistem-01.firebaseapp.com",
  databaseURL: "https://upa-sistem-01-default-rtdb.firebaseio.com/",
  projectId: "upa-sistem-01",
  storageBucket: "upa-sistem-01.firebasestorage.app",
  messagingSenderId: "8332712754",
  appId: "1:8332712754:web:46f7f225ab28bb98e4d52b",
  measurementId: "G-FF0PHWNG1V",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Inicializa o Realtime Database

export { database };
