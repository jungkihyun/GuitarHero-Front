import { useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
import './Chord.scss';
import NoteGrid from '../../components/noteGrid/NoteGrid';
import Common from '../../common/api/Common';

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

  // const [randomIndices, setRandomIndices] = useState([])

  const [chord, setChord] = useState({})

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

  const clearNoteGrid = async() => {
    
    const result = await Common.api.get('/api/chord', {});
    const chord = result.data.data;
    setChord(chord)
    setCorrect(chord.chord)
    setDetailChordBtns(chord.chordButtons)

    setStartFret(chord.start-1)

    setNoteObj({
      line1: chord.line1,
      line2: chord.line2,
      line3: chord.line3,
      line4: chord.line4,
      line5: chord.line5,
      line6: chord.line6,
      correct: chord.chord
    })
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
          <div className='chord-btn-detail'>
          {
            chord?.chordButtons?.map((data, dataIdx) => (
              <button key={dataIdx} onClick={(e) => handleNoteClick(data)}>
                {data}
              </button>
            ))
          }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chord;