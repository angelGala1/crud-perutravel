import React, { useState } from "react";
import { FaUser, FaBars, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../../styles/sliderbar.css";
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../Lugares/LogoutButton";


//https://react-icons.github.io/react-icons/search/#q=out
const SliderBar = ({ children, onLogout }) => {
  const [abrir, setAbrir] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setAbrir(!abrir);
  };

  const handleLogout = () => {
    onLogout();
    setAbrir(false); // Esto cerrará la barra lateral
    navigate('/login');
  };
  const menuItem = [
    {
      path: "/Cuenta",
      name: "Usuarios",
      icon: <FaUser />,
    },
    {
      path: "/Lugares",
      name: "Lugares",
      icon: <FaMapMarkerAlt />,
    },
    
  ];
  return (
    <div className="editSlide">
      <div className={`sidebar ${abrir ? "sidebar-closed" : ""}`}>
        <div className="top_section">
          {!abrir && <h1 className="logo">PerúTravel</h1>}
          <div className="bars">
            <FaBars
              onClick={toggle}
              style={{ width: "40px", fontSize: "20px" }}
            />
          </div>
        </div>
        <div className={`items ${abrir ? "items-closed" : ""}`}>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
            >
              <div className="item-edit">
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </div>
            </NavLink>
            
          ))}
                    <LogoutButton onLogout={onLogout} />

        </div>
      </div>
      <main> {children}</main>
    </div>
  );
};

export default SliderBar;
