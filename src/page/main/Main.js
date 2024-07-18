import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';

import Cookies from 'js-cookie';

const Main = () => {

  const navigate = useNavigate();
  
  const [cookieValue, setCookieValue] = useState('');

  useEffect(() => {
    setCookieValue(Cookies.get('heroInfo') || '')
    if(!!Cookies.get('correctAnswerCount') > 0) {
      Cookies.remove('correctAnswerCount')
    }
  }, [])

  const onStart = (path) => {
    console.log('cookie', cookieValue)
    cookieValue === '' ? navigate('/welcome') : navigate(path)
  }

  return (
    <div className="container">
        <div className="hero-text">
          <img src="/img/main-logo.png" alt="나의 기타히어로가 되어줘!" id="hero-image" />
        </div>
        {cookieValue !== '' ?
        <div className="welcome-message">
          <span className="highlight-name">{cookieValue}</span>님 반가워요!<br/>
          <span className="highlight-hero">기타히어로</span>가 될 자격이 있는지 테스트해볼까요?
        </div>
        : <></>}
        <button className="start-button" onClick={(e) => {onStart('/note')}}>지판 음 테스트</button>
        <button className="start-button" onClick={(e) => {onStart('/code')}}>코드 테스트</button>
        {cookieValue === '' ||
        <button className="welcome-button" onClick={(e) => navigate('/welcome')}>이름 변경</button>
        }
    </div>
  );
};

export default Main;
