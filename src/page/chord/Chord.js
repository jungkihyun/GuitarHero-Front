import { useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
import './Chord.scss';
import NoteGrid from '../../components/noteGrid/NoteGrid';
import ChordDetailBtn from './ChordDetailBtn.json'
import ChordJson from './Chord.json'

const Chord = ({ openModal }) => {

  const [detailChordBtns, setDetailChordBtns] = useState()

  const [successResult, setSuccessResult] = useState(false);
  const [failResult, setFailResult] = useState(false);

  const timeoutRef = useRef(null); // 타이머 ID를 저장할 ref

  const [startFret, setStartFret] = useState(0)

  const [correct, setCorrect] = useState()
  const [noteObj, setNoteObj] = useState({
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    line5: '',
    line6: ''
  })

  const [randomIndices, setRandomIndices] = useState([])

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
    console.log('correct', correct)
    if (note === correct) {
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

  // 랜덤으로 배열 요소를 선택
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const clearNoteGrid = () => {
    
    const headerChords = Object.keys(ChordJson)
    const randomHeaderChord = getRandomElement(headerChords);

    const detailChords = Object.keys(ChordJson[randomHeaderChord]);
    const randomDetailChordKey = getRandomElement(detailChords);
    const randomDetailChord = getRandomElement(ChordJson[randomHeaderChord][randomDetailChordKey]);
    setCorrect(randomDetailChordKey)

    const detailChordBtnsLength = ChordDetailBtn[randomHeaderChord].length

    const randomIndices = getRandomIndices(detailChordBtnsLength)
    setRandomIndices(randomIndices)
    setDetailChordBtns(ChordDetailBtn[randomHeaderChord])

    setStartFret(Number(randomDetailChord['start']) - 1)

    setNoteObj({
      line1: randomDetailChord['line1'],
      line2: randomDetailChord['line2'],
      line3: randomDetailChord['line3'],
      line4: randomDetailChord['line4'],
      line5: randomDetailChord['line5'],
      line6: randomDetailChord['line6'],
      correct: randomDetailChordKey
    })
  }

  useEffect(() => {
    console.log('randomIndices', randomIndices)
  }, [randomIndices])

  // const handleHeaderChordClick = (headerChord) => {
  //   setDetailChordBtns(ChordDetailBtn[headerChord])
  // }

  const getRandomIndices = (chordJsonLength) => {
    const indices = [];

    while (indices.length < 4) {
      const randomIndex = Math.floor(Math.random() * chordJsonLength);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    return indices;
  }

  return (
    <div className="note-wrapper">
      <div className='correct-contianer'>
        {correct}
      </div>
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
        <div className='chord-btn-container'>
          {/* <div className='chord-btn-header'>
            <button onClick={(e) => {handleHeaderChordClick('C')}}>C</button>
            <button onClick={(e) => {handleHeaderChordClick('C#')}}>C#</button>
            <button onClick={(e) => {handleHeaderChordClick('Db')}}>Db</button>
            <button onClick={(e) => {handleHeaderChordClick('D')}}>D</button>
            <button onClick={(e) => {handleHeaderChordClick('D#')}}>D#</button>
            <button onClick={(e) => {handleHeaderChordClick('Eb')}}>Eb</button>
            <button onClick={(e) => {handleHeaderChordClick('E')}}>E</button>
            <button onClick={(e) => {handleHeaderChordClick('F')}}>F</button>
            <button onClick={(e) => {handleHeaderChordClick('F#')}}>F#</button>
            <button onClick={(e) => {handleHeaderChordClick('Gb')}}>Gb</button>
            <button onClick={(e) => {handleHeaderChordClick('G')}}>G</button>
            <button onClick={(e) => {handleHeaderChordClick('G#')}}>G#</button>
            <button onClick={(e) => {handleHeaderChordClick('Ab')}}>Ab</button>
            <button onClick={(e) => {handleHeaderChordClick('A')}}>A</button>
            <button onClick={(e) => {handleHeaderChordClick('A#')}}>A#</button>
            <button onClick={(e) => {handleHeaderChordClick('Bb')}}>Bb</button>
            <button onClick={(e) => {handleHeaderChordClick('B')}}>B</button>
          </div> */}
          <div className='chord-btn-detail'>
          {
            detailChordBtns?.map((data, dataIdx) => (
              randomIndices.includes(dataIdx) || noteObj.correct === data ? (
                <button key={dataIdx} onClick={(e) => handleNoteClick(data)}>
                  {data}
                </button>
              ) : null
            ))
          }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chord;