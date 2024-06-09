import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Note.scss'

const Note = ({openModal}) => {
    const [selectedNote, setSelectedNote] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctNote, setCorrectNote] = useState('');
  const [result, setResult] = useState('');
  const [pointPosition, setPointPosition] = useState({ top: '0px', left: '0px' });
  const pointPositionArr = [
    {top: 48, left: 80},
    {top: 75, left: 80},
    {top: 101, left: 80},
    {top: 127, left: 80},
    {top: 155, left: 80},
    {top: 184, left: 80},
  ]

  const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  useEffect(() => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCorrectNote(randomNote);

    const shuffledNotes = notes.sort(() => 0.5 - Math.random());
    const options = shuffledNotes.slice(0, 3);
    options.push(randomNote);
    setAnswerOptions(options.sort(() => 0.5 - Math.random()));

    // 랜덤 위치 설정
    let index = 5;
    const top = pointPositionArr[index].top
    const left = pointPositionArr[index].left
    // const top = `${Math.floor(Math.random() * 80) + 10}%`; // 10% ~ 90% 사이의 값
    // const left = `${Math.floor(Math.random() * 80) + 10}%`; // 10% ~ 90% 사이의 값
    
    setPointPosition({ top, left });
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    if (note === correctNote) {
      setResult('정답입니다!');
    } else {
      setResult('오답입니다. 다시 시도하세요.');
    }
  };

  return (
    <div className="note-container">
      <div className="guitar-image">
        <img src="/img/note1-3.png" alt="Guitar" />
        <img
          src="/img/point.png"
          alt="Point"
          className="point-image"
          style={{ top: pointPosition.top, left: pointPosition.left }}
        />
      </div>
      <div className="answer-options">
        {answerOptions.map((note, index) => (
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