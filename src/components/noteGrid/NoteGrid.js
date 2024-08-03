import React from 'react';
import './NoteGrid.scss';

const NoteGrid = (props) => {
  // 데이터 형태
  const cells = Array(7).fill(null); // 길이 6의 배열 생성

  return (
    <div className="note-grid-container">
      <div className="note-grid">
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line1[0] - 1) === index
              ? <span className={`target ${props.noteObj.line1[1] === 'X' ? 'target-x' : props.noteObj.line1[0] === '0' ? 'target-zero' : props.noteObj.line1[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line1[1]}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line2[0] - 1) === index
              ? <span className={`target ${props.noteObj.line2[1] === 'X' ? 'target-x' : props.noteObj.line2[0] === '0' ? 'target-zero' : props.noteObj.line2[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line2[1]}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line3[0] - 1) === index
              ? <span className={`target ${props.noteObj.line3[1] === 'X' ? 'target-x' : props.noteObj.line3[0] === '0' ? 'target-zero' : props.noteObj.line3[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line3[1]}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line4[0] - 1) === index
              ? <span className={`target ${props.noteObj.line4[1] === 'X' ? 'target-x' : props.noteObj.line4[0] === '0' ? 'target-zero' : props.noteObj.line4[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line4[1]}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line5[0] - 1) === index
              ? <span className={`target ${props.noteObj.line5[1] === 'X' ? 'target-x' : props.noteObj.line5[0] === '0' ? 'target-zero' : props.noteObj.line5[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line5[1]}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line6[0] - 1) === index
              ? <><span className={`target ${props.noteObj.line6[1] === 'X' ? 'target-x' : props.noteObj.line6[0] === '0' ? 'target-zero' : props.noteObj.line6[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line6[1]}</span>{index+props.startPlat}</>
              : <>{index === 0 ? '' : index+props.startFret}</>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteGrid;
