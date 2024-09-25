import React from 'react';
import './Contact.scss';

const Contact = () => {
  const kakaoOpenChatUrl = 'https://open.kakao.com/o/sFg7MUCg'; // 실제 오픈채팅 URL로 대체

  return (
    <div className="contact-container">
        <div>
            <h1>Contact Us</h1>
            <p>궁금한점이 있으시다면 메일 혹은 카카오톡 오픈채팅을 통해 연락주세요!</p>
            <p>www.guitarhero.kr@gmail.com</p>
            <a href={kakaoOpenChatUrl} target="_blank" rel="noopener noreferrer" className="kakao-link">
                Join our KakaoTalk Open Chat
            </a>
        </div>
    </div>
  );
};

export default Contact;
