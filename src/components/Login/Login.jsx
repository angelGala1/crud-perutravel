import React, { useState } from 'react';
import '../../styles/login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar las credenciales (usuario y contraseña predefinidos)
    if (username === 'admin' && password === 'admin') {
      // Almacenar información de autenticación en localStorage
      localStorage.setItem('isAuthenticated', 'true');
      // Autenticación exitosa, llama a la función onLogin para actualizar el estado isAuthenticated a true
      onLogin();
    } else {
      // Credenciales incorrectas, puedes mostrar un mensaje de error o manejarlo como desees
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='logear'>Iniciar Sesión</h2>
        <label>Usuario</label>
        <input
          type="text"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-edit" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
