import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2024 GuitarHero. All rights reserved.</p>
        </div>
        <div className="footer-right">
          {/* <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a> */}
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
