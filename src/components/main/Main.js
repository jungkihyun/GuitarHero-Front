import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';

import Cookies from 'js-cookie';

const Main = () => {

  const navigate = useNavigate();
  
  const [cookieValue, setCookieValue] = useState('');

  let intervalId // intervalId 변수 선언
  let animationState = 'paused'

  useEffect(() => {
    setCookieValue(Cookies.get('heroInfo') || '')

    const element = document.querySelector('.start-button');
    element.style.animationPlayState = 'paused'

    const callFunctionEveryTwoSeconds = () => {
      intervalId = setInterval(function() {
        if(animationState === 'paused') {
          animationState = 'running'
        } else {
          animationState = 'paused'
        }
        element.style.animationPlayState = animationState
      }, 1000); // 시간 간격은 밀리초 단위로 지정 (여기서는 2초 = 2000밀리초)
    };

    callFunctionEveryTwoSeconds(); // 함수 호출

    // cleanup 함수
    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval 제거
    };
  }, []);

  const onStart = () => {
    console.log('cookie', cookieValue)
    cookieValue === '' ? navigate('/welcome') : navigate('/note')
  }


  return (
    <div className="container">
        <div className="hero-text">
          <img src="/img/main-logo.png" alt="나의 기타히어로가 되어줘!" id="hero-image" />
        </div>
        <button className="start-button" onClick={onStart}>시작하기</button>
    </div>
  );
};

export default Main;