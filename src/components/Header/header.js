// src/components/Header/Header.js
import React from 'react';
import './header.css';
import { ReactComponent as Logo } from '../../logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          {/* Le lien sur le logo ramène en haut de la page */}
          <a href="#home">
            <Logo className="logo" />
          </a>
        </div>
        <nav className="nav-menu">
          <a href="#about" className="nav-item">À Propos</a>
          <a href="#legends" className="nav-item">Légendes</a>
          <a href="#records" className="nav-item dashboard">Dashboard</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
