import React, { useRef, useState } from 'react';
import './Note2.scss';
import NoteGrid from '../../components/noteGrid/NoteGrid';

const Note2 = () => {
  const [selectedNote, setSelectedNote] = useState('');
  const [successResult, setSuccessResult] = useState(false);
  const [failResult, setFailResult] = useState(false);

  const timeoutRef = useRef(null); // 타이머 ID를 저장할 ref

  const handleNoteClick = (note) => {
    // 기존 타이머가 있으면 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (note === noteObj.correct) {
      setSuccessResult(true);
      setFailResult(false);
    } else {
      setSuccessResult(false);
      setFailResult(true);
    }
    
    // 2초 뒤에 초기화
    timeoutRef.current = setTimeout(() => {
      setSuccessResult(false);
      setFailResult(false);
    }, 1500); // 2000ms = 2초
    // setSelectedNote(note);

  };
  
  // const noteObj = {
  //   line1: '0E',
  //   line2: '1C',
  //   line3: '0G',
  //   line4: '2E',
  //   line5: '3C',
  //   line6: '0X',
  // }
  
  const noteObj = {
    line1: '0 ',
    line2: '',
    line3: '',
    line4: '',
    line5: '',
    line6: '',
    correct: 'E'
  }

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
          <NoteGrid 
            startPlat={1}
            noteObj={noteObj}
          />
        </div>
        <div className="note-buttons">
          <button onClick={() => handleNoteClick('C')}>C</button>
          <button onClick={() => handleNoteClick('D')}>D</button>
          <button onClick={() => handleNoteClick('E')}>E</button>
          <button onClick={() => handleNoteClick('F')}>F</button>
          <button onClick={() => handleNoteClick('G')}>G</button>
          <button onClick={() => handleNoteClick('A')}>A</button>
          <button onClick={() => handleNoteClick('B')}>B</button>
        </div>
      </div>
    </div>
  );
};

export default Note2;
