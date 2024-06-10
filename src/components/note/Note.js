import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Note.scss'

const Note = ({openModal}) => {
  const [result, setResult] = useState('');

  const [notes, setNotes] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'G♯/A♭', 'D♯/E♭', 'A♯/B♭', 'F♯/G♭', 'C♯/D♭']);
  const [noteAnswer, setNoteAnswer] = useState([['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E'],
                                                  ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'],
                                                  ['G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G'],
                                                  ['D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D'],
                                                  ['A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A'],
                                                  ['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E']])
  const guitarRef = useRef(null);

  const [fret, setFret] = useState(0)
  const [line, setLine] = useState(0)
  const [count, setCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => Math.max(prevTimeLeft - 0.1, 0));
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    let fretRandom = Math.floor(Math.random() * 12) + 1
    let lineRandom = Math.floor(Math.random()* 6) + 1
    setFret(fretRandom)
    setLine(lineRandom)
    suffleNotes()
  }, [count])

  const suffleNotes = () => {
    let newArray = [...notes];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setNotes(newArray)
    // return newArray;
  }

  const handleNoteClick = (note) => {
    console.log('f', fret)
    console.log('l', line)
    console.log(note)
    console.log(noteAnswer[line-1][fret-1])
    if(noteAnswer[line-1][fret-1] === note) {
      alert('정답')
    } else {
      alert('오답')
      return false;
    }
    // setSelectedNote(note);
    // if (note === correctNote) {
    //   openModal('', '정답입니다!', () => {});
    // } else {
    //   openModal('', '댕!', () => {});
    // }
      // openModal('', '정답입니다!', () => {setCount(++count)});
    const addCount = count + 1
    if(addCount > 10) {
      alert('chrhk')
      return false;
    }
    setCount(addCount)
  };

  return (
    <div className="note-container">
      <div className="timer-container">
        <div className="timer-bar" style={{ width: `${(timeLeft / 20) * 100}%` }}>
        </div>
      </div>
      <div className="text">남은시간</div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${count * 10}%` }}>
        </div>
      </div>
      <div className="text">진행도</div>
      <div className="guitar-image" ref={guitarRef}>
        <img src={`/img/notes/note${fret}${line}.png`} alt="Guitar" />
      </div>
      <div className="answer-options">
        {notes.map((note, index) => (
          <button key={index} onClick={() => handleNoteClick(note)}>
            {note}
          </button>
        ))}
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
};
  
export default Note;