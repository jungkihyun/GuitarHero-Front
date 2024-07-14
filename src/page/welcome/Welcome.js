import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.scss';
// import MouseAnimate from './MouseAnimate'; // Import MouseAnimate

import Cookies from 'js-cookie';

const Welcome = ({ openModal }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [typedText, setTypedText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [cookieValue, setCookieValue] = useState('');

  const handleCookieChange = (value) => {
    console.log('ee', value);
    setCookieValue(value);
    Cookies.set('heroInfo', value, { expires: 7 });
  };

  let typingInterval; // intervalId variable declaration
  let tempText = '';

  useEffect(() => {
    setTypedText('');

    const startTyping = () => {
      const welcomeText = '이름을 입력해주세요 !';
      let index = 0;
      typingInterval = setInterval(() => {
        tempText = tempText += welcomeText[index];
        setTypedText(tempText);
        index++;
        if (index === welcomeText.length) {
          clearInterval(typingInterval);
          setShowInput(true);
        }
      }, 70);
    };

    startTyping();

    // cleanup function
    return () => {
      clearInterval(typingInterval); // Remove interval on component unmount
    };
  }, []);

  useEffect(() => {}, [typedText]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleStartButtonClick = (e) => {
    if (name.trim() !== '') {
      // Add logic to move to the next page
      handleCookieChange(name);
      navigate('/');
    } else {
      openModal('확인', '이름을 입력해주세요.', () => {});
    }
  };

  return (
    <div className="welcome-container">
      {/* <MouseAnimate /> Add MouseAnimate here */}
      {/* <button className="go-back-button" onClick={(e) => { navigate('/'); }}>
        &lt;&lt; 돌아가기
      </button> */}
      <h1 className="typing-text">{typedText}</h1>
      {showInput && (
        <div className="input-container">
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={handleInputChange}
          />
          <button className="welcome-button" onClick={handleStartButtonClick}>저장</button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
