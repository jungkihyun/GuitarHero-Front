// src/pages/error/ErrorPage.js
import React from 'react';
import './ErrorPage.scss'; // SCSS 파일을 import

const ErrorPage = () => {
  const handleGoHome = () => {
    // 홈으로 이동하는 로직
    window.location.href = '/';
  };

  const handleGoBack = () => {
    // 이전페이지로
    window.history.back();
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-message">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        <div className="error-buttons">
          <button className="error-button" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="error-button" onClick={handleGoHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
