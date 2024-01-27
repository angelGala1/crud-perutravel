import React, { useState } from "react";

import "../../../styles/crear.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { db } from "../../../firebase/firebase";
const Creando = () => {
  //configurar state
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [clave, setClave] = useState("");

  const navigate = useNavigate();
  const cuentaCollection = collection(db, "Cuenta");

  const almacen = async (e) => {
    e.preventDefault();

    // Crear usuario en Firebase Authentication
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, clave);
      const user = userCredential.user;
      console.log('Usuario creado con UID:', user.uid);
    } catch (error) {
      console.error('Error al crear usuario en Firebase Authentication:', error.message);
      // Puedes manejar el error aquí según tus necesidades
      return;
    }

    // Luego, almacenar otros datos en Firestore
    try {
      await addDoc(cuentaCollection, {
        nombres: nombre,
        apellidos: apellido,
        email: email,
        dni: dni,
        clave: clave,
      });
      navigate("/Cuenta");
    } catch (error) {
      console.error('Error al almacenar datos en Firestore:', error.message);
      // Puedes manejar el error aquí según tus necesidades
    }
  };

  return (
    <>
      <div className=" contaier--modi">
        <div className="row  ">
          <div className="col create">
            <h1 className="titulo">Crear nuevo Usuario</h1>
            <form onSubmit={almacen}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Clave</label>
                <input
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success " style={{width:"120px"}}>
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creando;
