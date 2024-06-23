import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './Layout.scss';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>My Project</span>
        </div>
        <div className="options">
          <Link to="/mypage">My Page</Link>
          <button className="theme-toggle">White/Dark Mode</button>
          <button className="hamburger-button" onClick={toggleSidebar}>
            &#9776;
          </button>
        </div>
      </header>
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/welcome">Welcome</Link></li>
            <li><Link to="/note">Note</Link></li>
          </ul>
        </nav>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
