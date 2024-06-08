import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.scss'

const Welcome = ({ openModal }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [typedText, setTypedText] = useState('');
  const [showInput, setShowInput] = useState(false);

  
  let typingInterval // intervalId 변수 선언
  let tempText = ''

  useEffect(() => {
    setTypedText('')
    
    const startTyping = () => {
      const welcomeText = "이름을 입력해주세요."
      let index = 0;
      typingInterval = setInterval(() => {
        tempText = tempText += welcomeText[index]
        setTypedText(tempText)
        index++;
        if (index === welcomeText.length) {
          clearInterval(typingInterval);
          setShowInput(true);
        }
      }, 70);
      
    };
    
    startTyping()
    
    // cleanup 함수
    return () => {
      clearInterval(typingInterval); // 컴포넌트가 언마운트되면 interval 제거
    };
    
  }, [])

  useEffect(() => {
  }, [typedText])


  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleStartButtonClick = () => {
    if (name.trim() !== '') {
      // 다음 페이지로 이동하는 로직 추가
      navigate('/');
    } else {
      openModal('확인', '이름을 입력해주세요.', () => {});
    }
  };

  return (
    <div className="welcome-container">
      <button className="go-back-button" onClick={(e) => {navigate('/')}}>
        &lt;&lt; 돌아가기
      </button>
      <h1 className="typing-text">{typedText}</h1>
      {showInput && (
        <div className="input-container">
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={handleInputChange}
          />
          <button className="welcome-button" onClick={handleStartButtonClick}>시작!</button>
        </div>
      )}
    </div>
  );
};

export default Welcome;