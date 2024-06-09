import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Note.scss'

const Note = ({openModal}) => {
  const [result, setResult] = useState('');

  const [notes, setNotes] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'G♯/A♭', 'D♯/E♭', 'A♯/B♭', 'F♯/G♭', 'C♯/D♭']);
  const guitarRef = useRef(null);

  const [fret, setFret] = useState(0)
  const [line, setLine] = useState(0)
  const [count, setCount] = useState(1)
  const [noteButtons, setNoteButtons] = useState()

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
    // setSelectedNote(note);
    // if (note === correctNote) {
    //   openModal('', '정답입니다!', () => {});
    // } else {
    //   openModal('', '댕!', () => {});
    // }
      // openModal('', '정답입니다!', () => {setCount(++count)});
    const addCount = count + 1
    setCount(addCount)
  };

  return (
    <div className="note-container">
      {count}
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