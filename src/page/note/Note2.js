import React, { useState } from 'react';
import './Note2.scss';

const Note2 = ({ openModal }) => {
  const [selectedNote, setSelectedNote] = useState('');
  const [successResult, setSuccessResult] = useState(false);
  const [failResult, setFailResult] = useState(false);

  const handleNoteClick = (note) => {
    // 여기에 노트를 클릭했을 때의 로직을 추가하세요
    if (note === 'C') {
      setSuccessResult(true);
      setFailResult(false);
    } else {
      setSuccessResult(false);
      setFailResult(true);
    }
    setSelectedNote(note);
  };

  return (
    <div className="note-wrapper">
      <div className='note-result-container'>
        <div className={`note-result success ${successResult ? 'active' : ''}`}>
          정답입니다!
        </div>
        <div className={`note-result fail ${failResult ? 'active' : ''}`}>
          오답입니다.
        </div>
      </div>
      <div className="note-container">
        <div className="note-grid">
          {/* NoteGrid 컴포넌트가 여기에 들어갑니다 */}
          NoteGrid
        </div>
        <div className="note-buttons">
          <button onClick={() => handleNoteClick('C')}>C</button>
          <button onClick={() => handleNoteClick('D')}>D</button>
          <button onClick={() => handleNoteClick('E')}>E</button>
          <button onClick={() => handleNoteClick('F')}>F</button>
          <button onClick={() => handleNoteClick('G')}>G</button>
          <button onClick={() => handleNoteClick('A')}>A</button>
          <button onClick={() => handleNoteClick('B')}>B</button>
          <button onClick={() => handleNoteClick('A')}>A</button>
          <button onClick={() => handleNoteClick('B')}>B</button>
          <button onClick={() => handleNoteClick('A')}>A</button>
          <button onClick={() => handleNoteClick('B')}>B</button>
        </div>
      </div>
    </div>
  );
};

export default Note2;
