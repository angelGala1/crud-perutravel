import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route ,Navigate,} from "react-router-dom";
import SliderBar from "./components/SliderBar/SliderBar";
import Mostrar from "./components/Cuentas/CrudCuenta/Mostrar";
import Creando from "./components/Cuentas/CrudCuenta/Creando";
import Edit from "./components/Cuentas/CrudCuenta/Edit";
import MostrarLugar from "./components/Lugares/CrudLugares/MostrarLugar";
import CrearLugar from "./components/Lugares/CrudLugares/CrearLugar";
import EditarLugar from "./components/Lugares/CrudLugares/EditarLugar";
import Login from "./components/Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Esto cerrará la sesión y redirigirá al usuario a la página de inicio de sesión
    return <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <Route
              path="/*"
              element={
                <SliderBar onLogout={handleLogout}>
                  <Routes>
                    <Route path="/Cuenta" element={<Mostrar />} />
                    <Route path="/Lugares" element={<MostrarLugar />} />
                    <Route path="/create" element={<Creando />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/editLugar/:id" element={<EditarLugar />} />
                    <Route path="/createLugar" element={<CrearLugar />} />
                    <Route path="/MostrarLugar" element={<MostrarLugar />} />
                  </Routes>
                </SliderBar>
              }
            />
          ) : (
            <Route path="/*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
