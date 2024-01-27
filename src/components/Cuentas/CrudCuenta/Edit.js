import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "../../../styles/editar.css"
const Edit = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [clave, setClave] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const update = async (e) => {
    e.preventDefault();
    const cuenta = doc(db, "Cuenta", id);
    const data = {
      nombres: nombre,
      apellidos: apellido,
      email: email,
      dni: dni,
      clave: clave,
    };
    updateDoc(cuenta, data);
    navigate("/Cuenta");
  };
  const getCuentaById = async (id) => {
    const cuenta = await getDoc(doc(db, "Cuenta", id)); // Corregido aquí
    if (cuenta.exists()) {
      console.log(cuenta.data());
      setNombre(cuenta.data().nombres);
      setApellido(cuenta.data().apellidos);
      setEmail(cuenta.data().email);
      setDni(cuenta.data().dni);
      setClave(cuenta.data().clave);
    } else {
      console.log("La cuenta no existe");
    }
  };
  useEffect(() => {
    getCuentaById(id);
  }, []);
  return (
    <>
      <div className=" container-modi ">
        <div className="row">
          <div className="col edit">
            <h1 className="titulo">Editar Usuario</h1>
            <form onSubmit={update}>
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
              <button type="submit" className="btn btn-success" style={{width:"120px"}}>
                Editar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
