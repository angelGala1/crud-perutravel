import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import '../../../styles/editarLugar.css'
const EditarLugar = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [longitud, setlongitud] = useState(0);
    const [latitud, setLatitud] = useState(0);
    const [foto, setfoto] = useState("");
  
    const navigate = useNavigate();
    const { id } = useParams();
    const update = async (e) => {
      e.preventDefault();
      const destino = doc(db, "Destinos", id);
      const data = {
        nombre: nombre,
        descripcion: descripcion,
        longitud: longitud,
        latitud: latitud,
        foto: foto,
      };
      updateDoc(destino, data);
      navigate("/MostrarLugar");
    };
    const getdestinoById = async (id) => {
      const destino = await getDoc(doc(db, "Destinos", id)); // Corregido aquí
      if (destino.exists()) {
        console.log(destino.data());
        setNombre(destino.data().nombre);
        setdescripcion(destino.data().descripcion);
        setlongitud(destino.data().longitud);
        setLatitud(destino.data().latitud);
        setfoto(destino.data().foto);
      } else {
        console.log("La destino no existe");
      }
    };
    useEffect(() => {
      getdestinoById(id);
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
                  <label className="form-label">descripcion</label>
                  <input
                    value={descripcion}
                    onChange={(e) => setdescripcion(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">longitud</label>
                  <input
                    value={longitud}
                    onChange={(e) => setlongitud(Number(e.target.value))}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">latitud</label>
                  <input
                    value={latitud}
                    onChange={(e) => setLatitud(Number(e.target.value))}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">foto</label>
                  <input
                    value={foto}
                    onChange={(e) => setfoto(e.target.value)}
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
}

export default EditarLugar
