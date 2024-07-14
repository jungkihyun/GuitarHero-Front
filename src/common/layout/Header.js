import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
// import profileImage from './path_to_profile_image'; // 실제 프로필 이미지 경로로 변경

const Header = ({ isLoggedIn, userName, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate('/')}>
        {/* img src="/img/logo.png" alt="GuitarHero Logo" className="logo<" /> */}
        기타히어로
      </div>
      <div className="header-right">
        {/* {isLoggedIn ? (
          <div className="profile-container">
            <img src={profileImage} alt="Profile" className="profile-image" onClick={handleProfileClick} />
            <span className="profile-name" onClick={handleProfileClick}>{userName}</span>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => navigate('/profile')}>Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        )} */}
      </div>
    </header>
  );
};

export default Header;
