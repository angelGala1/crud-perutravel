import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    // Esto cerrará la sesión y redirigirá al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <NavLink to="/logout" className="link" activeClassName="active" onClick={handleLogout}>
      <div className="item-edit">
        <div className="icon">
          <FaSignOutAlt />
        </div>
        <div className="link_text">Salir</div>
      </div>
    </NavLink>
  );
};

export default LogoutButton;
