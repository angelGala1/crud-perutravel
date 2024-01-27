import React from "react";
import { useState, useEffect } from "react";
import "../../../styles/mostrar.css";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
//esto solo para eliminar el documento
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Myswal = withReactContent(Swal);

const Mostrar = () => {
  //1.Configurar los hooks
  const [cuenta, setCuentas] = useState([]);
  //2. Referenciamos a la DB firestore
  const cuentaCollection = collection(db, "Cuenta");
  //3. Funcion para mostrar Todos los docs
  const getCuentas = async () => {
    try {
      const data = await getDocs(cuentaCollection);

      // Utilizamos map para agregar un campo "id" a cada documento
      const cuentasData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Actualizamos el estado con los documentos y sus IDs
      setCuentas(cuentasData);
      console.log(cuentasData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  //4.Funcion para eliminar un doc
  const deleteCuenta = async (id) => {
    const cuentaDoct = doc(db, "Cuenta", id);
    await deleteDoc(cuentaDoct);
    getCuentas();
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
        deleteCuenta(id);
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
    getCuentas();
  }, []);
  //7-Vista de nuestro componente
  return (
    <div className="Mostrando">
      <h1 className="titulo">Mostrar Listas de Usuarios</h1>
      <div className="container fondo table-container">
        <div className="row">
          <div className="col">
            <div className="">
              <Link
                to="/create"
                className="btn btn-modify"
                style={{ background: "#157347",  color:"white" ,fontSize:"18px" }}
              >
                Crear
              </Link>
            </div>

            <table className="table  table-hover table_edit">
              <thead className=" table-success">
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Dni</th>
                  <th>Clave</th>
                  <th>Botones</th>
                </tr>
              </thead>
              <tbody>
                {cuenta.map((e) => (
                  <tr key={e.id}>
                    <td>{e.nombres}</td>
                    <td>{e.apellidos}</td>
                    <td>{e.email}</td>
                    <td>{e.dni}</td>
                    <td>{e.clave}</td>

                    <td>
                      <Link to={`/edit/${e.id}`} className="btn btn-warning">
                        <i className="fa-solid fa-pen-to-square"></i>Editar
                      </Link>
                      <button
                        onClick={() => {
                          confirmarDelete(e.id);
                        }}
                        className="btn btn-danger btn-mostrar"
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
};

export default Mostrar;
