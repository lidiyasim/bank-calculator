// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="top-navbar">
      <div className="logo">💼 Финансовый Калькулятор</div>
      <nav>
        <ul>
          <li><Link to="/">🏠 Главная</Link></li>
          <li><Link to="/mortgage">🏡 Ипотека</Link></li>
          <li><Link to="/auto">🚗 Автокредит</Link></li>
          <li><Link to="/pension">👴 Пенсия</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
