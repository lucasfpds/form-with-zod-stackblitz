import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/animated-form" className={({ isActive }) => isActive ? "active" : ""}>
              <button className="nav-button">Formulário Animado</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/zod-form" className={({ isActive }) => isActive ? "active" : ""}>
              <button className="nav-button">Novo Formulário (Zod)</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
