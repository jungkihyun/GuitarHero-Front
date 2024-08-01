import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuToggle, setMenuToggle] = useState('');

  useEffect(() => {
    // 현재 경로에 따라 menuToggle 상태를 설정
    if (location.pathname === '/note') {
      setMenuToggle('note');
    } else if (location.pathname === '/chord') {
      setMenuToggle('chord');
    } else {
      setMenuToggle('');
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-top"
        onClick={() => {
          setMenuToggle('');
          navigate('/');
        }}>
        기타히어로
      </div>
      <div className="menu-bar">
        <div className="menu-bar__nav">
          <span className={`menu-bar__nav-item ${menuToggle === 'note' ? 'active' : ''}`}
            onClick={() => {
              setMenuToggle('note');
              navigate('/note');
          }}>지판 음 찾기</span>
          <span className={`menu-bar__nav-item ${menuToggle === 'chord' ? 'active' : ''}`}
            onClick={() => {
              setMenuToggle('chord');
              navigate('/chord');
          }}>코드 찾기</span>
        </div>
      </div>
      {/* <div className="header-right">
        {isLoggedIn ? (
          <div className="profile-container">
            <img src="/path/to/profile.jpg" alt="Profile" className="profile-image" />
            <span className="profile-name">{userName}</span>
            <div className="dropdown-menu">
              <ul>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        )}
      </div> */}
    </header>
  );
};

export default Header;
