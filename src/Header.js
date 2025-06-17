import React from 'react';
import { NavLink } from 'react-router-dom'; // Alterado de Link para NavLink
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <ul>
          <li>
            {/* Usando NavLink para que a classe 'active' seja aplicada */}
            <NavLink to="/animated-form" className={({ isActive }) => isActive ? "active" : ""}>
              <button className="nav-button">Formulário Animado</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/zup-form" className={({ isActive }) => isActive ? "active" : ""}>
              <button className="nav-button">Novo Formulário (Zup)</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
