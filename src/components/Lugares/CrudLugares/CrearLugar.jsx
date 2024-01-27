import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
const CrearLugar = () => {
  //configurar state
  const [nombre, setNombre] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [longitud, setlongitud] = useState(0);
  const [latitud, setLatitud] = useState(0);
  const [foto, setfoto] = useState("");

  const navigate = useNavigate();
  const cuentaCollection = collection(db, "Destinos");

  const almacen = async (e) => {
    e.preventDefault();
    await addDoc(cuentaCollection, {
        nombre: nombre,
      descripcion: descripcion,
      longitud: longitud,
      latitud: latitud,
      foto: foto,
    });
    navigate("/MostrarLugar");
  };

  return (
    <>
      <div className=" contaier--modi">
        <div className="row  ">
          <div className="col create">
            <h1 className="titulo">Crear nuevo Destino</h1>
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
                <label className="form-label">Descripcion</label>
                <input
                  value={descripcion}
                  onChange={(e) => setdescripcion(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Longitud</label>
                <input
                  value={longitud}
                  onChange={(e) => setlongitud(Number(e.target.value))}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Latitud</label>
                <input
                  value={latitud}
                  onChange={(e) => setLatitud(Number(e.target.value))}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input
                  value={foto}
                  onChange={(e) => setfoto(e.target.value)}
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
}

export default CrearLugar
