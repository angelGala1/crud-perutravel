
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBAM1LWAGaLdwAp8I2HRL7eM5S4QykFO4c",
  authDomain: "productofinal3unidad.firebaseapp.com",
  projectId: "productofinal3unidad",
  storageBucket: "productofinal3unidad.appspot.com",
  messagingSenderId: "56512134374",
  appId: "1:56512134374:web:a565d99c60de8000ef4f27",
  measurementId: "G-GMKLX2NMP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//conexion a la BD
export const db=getFirestore(app)
//const analytics = getAnalytics(app);