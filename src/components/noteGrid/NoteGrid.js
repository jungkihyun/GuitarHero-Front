import React from 'react';
import './NoteGrid.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const NoteGrid = (props) => {
  // 데이터 형태
  const cells = Array(7).fill(null); // 길이 6의 배열 생성

  const positionMark3 = [3, 5, 7, 9, 15, 17, 19, 21]
  const positionMark24 = [12, 24]

  return (
    <div className="note-grid-container">
      {!props.noteObj.chordType ||
      <div className="chord-type">
        {props.noteObj.chordType === 1 ? '개방현코드'
        : props.noteObj.chordType === 2 ? '오픈보이싱'
        : props.noteObj.chordType === 3 ? '바레코드' : ''
        }
      </div>
      }
      <div className={`note-grid ${props.type}`}>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line1[0]) === index
              ? <span className={`target ${props.noteObj.line1[1] === 'X' ? 'target-x' : props.noteObj.line1[0] === '0' ? 'target-zero' : props.noteObj.line1[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line1.slice(1)}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {
                positionMark24.includes(index+props.startFret) && index !== 0
                ? <span className='position-mark'></span>
                : <></>
              }
              {parseInt(props.noteObj.line2[0]) === index
              ? <span className={`target ${props.noteObj.line2[1] === 'X' ? 'target-x' : props.noteObj.line2[0] === '0' ? 'target-zero' : props.noteObj.line2[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line2.slice(1)}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {
                positionMark3.includes(index+props.startFret) && index !== 0
                ? <span className='position-mark'></span>
                : <></>
              }
              {parseInt(props.noteObj.line3[0]) === index
              ? <span className={`target ${props.noteObj.line3[1] === 'X' ? 'target-x' : props.noteObj.line3[0] === '0' ? 'target-zero' : props.noteObj.line3[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line3.slice(1)}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {
                positionMark24.includes(index+props.startFret) && index !== 0
                ? <span className='position-mark'></span>
                : <></>
              }
              {parseInt(props.noteObj.line4[0]) === index
              ? <span className={`target ${props.noteObj.line4[1] === 'X' ? 'target-x' : props.noteObj.line4[0] === '0' ? 'target-zero' : props.noteObj.line4[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line4.slice(1)}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line5[0]) === index
              ? <span className={`target ${props.noteObj.line5[1] === 'X' ? 'target-x' : props.noteObj.line5[0] === '0' ? 'target-zero' : props.noteObj.line5[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line5.slice(1)}</span>
              : <></>}
            </div>
          ))}
        </div>
        <div className="note-row">
          {cells.map((_, index) => (
            <div className={`note-cell ${props.startFret === 0 && index === 1 ? 'note-cell-first' : ''}`} key={index}>
              {parseInt(props.noteObj.line6[0]) === index
              ? <><span className={`target ${props.noteObj.line6[1] === 'X' ? 'target-x' : props.noteObj.line6[0] === '0' ? 'target-zero' : props.noteObj.line6[1] === ' ' ? 'target-note' : ''}`}>{props.noteObj.line6.slice(1)}</span>{index === 0 ? '' : index+props.startFret}</>
              : <>{index === 0 ? '' : index+props.startFret}</>}
            </div>
          ))}
        </div>
      </div>
      {props.type !== 'chord' ||
      <button onClick={props.playStroke} className="play-stroke-btn">
        <FontAwesomeIcon icon={faPlay} />
      </button>
      }
    </div>
  );
};

export default NoteGrid;
