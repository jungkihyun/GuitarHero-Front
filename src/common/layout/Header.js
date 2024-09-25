import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // 햄버거 아이콘 가져오기

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


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // 메뉴 바깥 클릭 시 메뉴를 닫는 함수
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };


  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="menu-icon" onClick={() => {
        toggleMobileMenu()
      }}>
        <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
      </div>
      <div className="header-top"
        onClick={() => {
          setMenuToggle('');
          navigate('/');
        }}>
        기타히어로
      </div>
      {/* 메뉴 바깥 부분을 클릭하면 메뉴가 닫히도록 하는 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className={`menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)} // 클릭 시 메뉴 닫기
        ></div>
      )}
      <div className={`menu-bar ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="menu-bar__nav">
          <span className={`menu-bar__nav-item ${menuToggle === 'note' ? 'active' : ''}`}
            onClick={() => {
              setMenuToggle('note');
              navigate('/note');
              setIsMobileMenuOpen(false);
          }}>지판 음 찾기</span>
          <span className={`menu-bar__nav-item ${menuToggle === 'chord' ? 'active' : ''}`}
            onClick={() => {
              setMenuToggle('chord');
              navigate('/chord');
              setIsMobileMenuOpen(false);
          }}>코드 찾기</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
