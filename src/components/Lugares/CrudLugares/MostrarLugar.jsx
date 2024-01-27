import React from 'react'
import "../../../styles/mostrarLugar.css"
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
//esto solo para eliminar el documento
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Myswal = withReactContent(Swal);
const MostrarLugar = () => {
//1.Configurar los hooks
const [destino, setdestinos] = useState([]);
//2. Referenciamos a la DB firestore
const destinoCollection = collection(db, "Destinos");
//3. Funcion para mostrar Todos los docs
const getdestinos = async () => {
  try {
    const data = await getDocs(destinoCollection);

    // Utilizamos map para agregar un campo "id" a cada documento
    const destinosData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Actualizamos el estado con los documentos y sus IDs
    setdestinos(destinosData);
    console.log(destinosData);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

//4.Funcion para eliminar un doc
const deletedestino = async (id) => {
  const destinoDoct = doc(db, "Destinos", id);
  await deleteDoc(destinoDoct);
  getdestinos();
};
//5.Funcion para confirmacion de sweet alert
const confirmarDelete = (id) => {
  Swal.fire({
    title: "¿Estás seguro de eliminarlo?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminarlo",
  }).then((result) => {
    if (result.isConfirmed) {
      deletedestino(id);
      Swal.fire({
        title: "¡Eliminado!",
        text: "Tu archivo ha sido eliminado.",
        icon: "success",
      });
    }
  });
};

//6 usamos useEffect
useEffect(() => {
  getdestinos();
}, []);
//7-Vista de nuestro componente
return (
  <div className="Mostrando">
    <h1 className="titulo">Mostrar Listas de Destinos</h1>
    <div className="container fondo table-container">
      <div className="row">
        <div className="col">
          <div className="">
            <Link
              to="/createLugar"
              className="btn btn-modify"
              style={{ background: "#157347",  color:"white" ,fontSize:"18px" }}
            >
              Crear
            </Link>
          </div>

          <table className="table  table-hover table-light table_edit ">
            <thead className="   table-success">
              <tr>
                
                <th>Nombre</th>
                <th id='descripcion'>Descripción</th>
                <th>Longitud</th>
                <th>Latitud</th>
                <th id='disminuir'>Foto</th>
                <th id='editBotones'>Botones</th>                
              </tr>
            </thead>
            <tbody>
              {destino.map((e) => (
                <tr key={e.id}>
              
                  <td>{e.nombre}</td>
                  <td>{e.descripcion}</td>
                  <td>{e.longitud}</td>
                  <td>{e.latitud}</td>
                 
                  <td >{e.foto}</td>
                  <td>
                    <Link to={`/editLugar/${e.id}`} className="btn btn-warning btn-edit" style={{}}>
                      <i className="fa-solid fa-pen-to-square"></i>Editar
                    </Link>
                    <button
                      onClick={() => {
                        confirmarDelete(e.id);
                      }}
                      className="btn btn-danger btn-mostrar btn-edit"
                    >
                      <i className="fa-solid fa-trash"></i>Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}

export default MostrarLugar
