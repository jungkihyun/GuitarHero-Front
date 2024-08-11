import React, { useEffect, useRef, useState } from 'react';
import './Note.scss';
import NoteGrid from '../../components/noteGrid/NoteGrid';

const Note = () => {
  const [successResult, setSuccessResult] = useState(false);
  const [failResult, setFailResult] = useState(false);

  const timeoutRef = useRef(null); // 타이머 ID를 저장할 ref

  const [startFret, setStartFret] = useState(0)
  
  const [noteObj, setNoteObj] = useState({
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    line5: '',
    line6: '',
    correct: ''
  })

  const noteCorrect = [
    ['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E'],
    ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'],
    ['G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G'],
    ['D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D'],
    ['A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A'],
    ['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E']
  ];

  useEffect(() => {
    clearNoteGrid()
  }, [])

  const handleNoteClick = (note) => {
    // 기존 타이머가 있으면 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    console.log('정답체크')
    console.log('note', note)
    console.log('noteObj.correct', noteObj.correct)
    if (note === noteObj.correct) {
      setSuccessResult(true);
      setFailResult(false);
      clearNoteGrid();
    } else {
      setSuccessResult(false);
      setFailResult(true);
    }
    
    // 2초 뒤에 초기화
    timeoutRef.current = setTimeout(() => {
      setSuccessResult(false);
      setFailResult(false);
    }, 700); // 2000ms = 2초

  };
  
  // const noteObj = {
  //   line1: '0E',
  //   line2: '1C',
  //   line3: '0G',
  //   line4: '2E',
  //   line5: '3C',
  //   line6: '0X',
  // }
  
  // const noteObj = {
  //   line1: '0 ',
  //   line2: '',
  //   line3: '',
  //   line4: '',
  //   line5: '',
  //   line6: '',
  //   correct: 'E'
  // }

  useEffect(() => {
    console.log(noteObj)
  }, [noteObj])


  const clearNoteGrid = () => {
    let min = 0;
    let max = 16;
    const fretValue = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 랜덤한 정수
    setStartFret(fretValue);

    min = 1;
    max = 6;
    const lineValue = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 랜덤한 정수
    const noteValue = Math.floor(Math.random() * (max - min + 1)) + min; // min과 max 사이의 랜덤한 정수
    clearNoteObj(fretValue, lineValue, noteValue);
  }

  const clearNoteObj = (fretValue, lineValue, noteValue) => {
    console.log('fretValue', fretValue)
    console.log('lineValue', lineValue)
    console.log('noteValue', noteValue)
    console.log(noteCorrect[lineValue-1][(fretValue-1) + noteValue])

    setNoteObj({
      ...noteObj,
      line1: lineValue === 1 ? noteValue + ' ' : '',
      line2: lineValue === 2 ? noteValue + ' ' : '',
      line3: lineValue === 3 ? noteValue + ' ' : '',
      line4: lineValue === 4 ? noteValue + ' ' : '',
      line5: lineValue === 5 ? noteValue + ' ' : '',
      line6: lineValue === 6 ? noteValue + ' ' : '',
      correct: noteCorrect[lineValue-1][(fretValue-1) + noteValue]
    });
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
            startFret={startFret}
            noteObj={noteObj}
          />
        </div>
        <div className="note-buttons">
          <button onClick={() => handleNoteClick('C')}>C</button>
          <button onClick={() => handleNoteClick('C♯/D♭')}>C♯/D♭</button>
          <button onClick={() => handleNoteClick('D')}>D</button>
          <button onClick={() => handleNoteClick('D♯/E♭')}>D♯/E♭</button>
          <button onClick={() => handleNoteClick('E')}>E</button>
          <button onClick={() => handleNoteClick('F')}>F</button>
          <button onClick={() => handleNoteClick('F♯/G♭')}>F♯/G♭</button>
          <button onClick={() => handleNoteClick('G')}>G</button>
          <button onClick={() => handleNoteClick('G♯/A♭')}>G♯/A♭</button>
          <button onClick={() => handleNoteClick('A')}>A</button>
          <button onClick={() => handleNoteClick('A♯/B♭')}>A♯/B♭</button>
          <button onClick={() => handleNoteClick('B')}>B</button>
        </div>
      </div>
    </div>
  );
};

export default Note;
