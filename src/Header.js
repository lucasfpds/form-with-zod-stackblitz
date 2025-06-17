import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Criaremos este arquivo para estilos

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/animated-form">
              <button className="nav-button">Formulário Animado</button>
            </Link>
          </li>
          <li>
            <Link to="/zup-form">
              <button className="nav-button">Novo Formulário (Zup)</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
