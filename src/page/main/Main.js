import React from 'react';
import './Main.scss';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className="hero" style={{ backgroundImage: `url(/img/background-image.jpg)` }}>
        <h1>기타히어로</h1>
        <p>기타히어로가 될 자격이 있는지 테스트 해보세요!</p>
        {/* <button className="cta-button">시작하기</button> */}
      </section>
      <section className="features">
        <div className="feature" onClick={() => navigate('/note2')}>
          <h2>지판 음 찾기</h2>
          <p>기타 지판에서 음을 찾아보세요.</p>
        </div>
        <div className="feature" onClick={() => navigate('/chord')}>
          <h2>코드 찾기</h2>
          <p>다양한 코드를 찾아보세요.</p>
        </div>
        {/* <div className="feature" onClick={() => navigate('/quiz')}>
          <h2>퀴즈</h2>
          <p>기타 관련 퀴즈를 풀어보세요.</p>
        </div> */}
      </section>
    </main>
  );
};

export default Main;
