import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({ isLoggedIn, userName, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate('/')}>
        기타히어로
      </div>
      <div className='menu-bar'>
        <div className='menu-bar__nav'>
          <span className='menu-bar__nav-item active'>aaaa</span>
          <span className='menu-bar__nav-item'>aaaa</span>
          <span className='menu-bar__nav-item'>aaaa</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
