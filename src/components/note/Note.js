import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Note.scss';
import Cookies from 'js-cookie';

const Note = ({ openModal }) => {
  
  const navigate = useNavigate();

  const [result, setResult] = useState('');
  const [notes, setNotes] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'G♯/A♭', 'D♯/E♭', 'A♯/B♭', 'F♯/G♭', 'C♯/D♭']);
  const [noteAnswer, setNoteAnswer] = useState([
    ['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E'],
    ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'],
    ['G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G'],
    ['D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D'],
    ['A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A'],
    ['F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E']
  ]);
  const guitarRef = useRef(null);
  const [fret, setFret] = useState(1);
  const [line, setLine] = useState(1);
  const [count, setCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(20);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const intervalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFadeout, setIsLoadingFadeout] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    if(!!Cookies.get('correctAnswerCount') > 0) {
      setIsLoadingFadeout(true)
      setIsLoading(false);
      setIsTestCompleted(true);
      return;
    }
    intervalRef.current = setInterval(intervalFunc, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (count === 10) {
      Cookies.set('correctAnswerCount', correctAnswerCount, { expires: 7 });
      clearInterval(intervalRef.current);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoadingFadeout(true)
        setIsLoading(false);
        setIsTestCompleted(true);
      }, 2000);
      return;
    }

    let fretRandom = Math.floor(Math.random() * 12) + 1;
    let lineRandom = Math.floor(Math.random() * 6) + 1;
    setFret(fretRandom);
    setLine(lineRandom);
    suffleNotes();
  }, [count]);

  const intervalFunc = () => {
    setTimeLeft(prevTimeLeft => Math.max(prevTimeLeft - 0.1, 0));
  };

  useEffect(() => {
    if(timeLeft === 0) {
      setWrongAnswerCount(0)
      clearInterval(intervalRef.current);
      setTimeLeft(21);
      intervalRef.current = setInterval(intervalFunc, 100);
      setCount(count + 1);
    }
  }, [timeLeft])

  const suffleNotes = () => {
    let newArray = [...notes];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setNotes(newArray);
  };

  const handleNoteClick = (note) => {
    if (noteAnswer[line - 1][fret - 1] === note) {
      clearInterval(intervalRef.current);
      setTimeLeft(21);
      intervalRef.current = setInterval(intervalFunc, 100);
      setCorrectAnswerCount(correctAnswerCount + 1);
      setWrongAnswerCount(0);
      setCount(count + 1);
    } else if (wrongAnswerCount === 2) {
      setWrongAnswerCount(0);
      clearInterval(intervalRef.current);
      setTimeLeft(21);
      intervalRef.current = setInterval(intervalFunc, 100);
      setCount(count + 1);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
    }
  };

  return (
    <div className={`note-container ${isLoading && isLoadingFadeout  ? 'fade-out' : isTestCompleted ? 'fade-in' : ''}`}>
      {isLoading ? (
        <div className='loading'>
          <p>테스트가 완료되었습니다.</p>
        </div>
      ) : isTestCompleted ? (
        <div className="result">
          <img src="/img/loading.gif" alt="로딩 중" />
          <div className="">
            {Cookies.get('heroInfo')}님의
            테스트 결과: {correctAnswerCount} / {count}
          </div>
          <div className="">
            <button className=""
              onClick={() => {navigate('/')}}>
              처음으로
            </button>
            <button className=""
              onClick={() => {
                Cookies.remove('correctAnswerCount')
                setIsLoadingFadeout(false)
                setIsLoading(false)
                setIsTestCompleted(false)
                intervalRef.current = setInterval(intervalFunc, 100)
                setCount(1)
                setCorrectAnswerCount(0);
                setWrongAnswerCount(0);
              }}>
              다시하기
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="go-back-button" onClick={(e) => {navigate('/')}}>
            &lt;&lt; 돌아가기
          </button>
          <div className="timer-container">
            <div className="timer-bar" style={{ width: `${(timeLeft / 20) * 100}%` }}></div>
          </div>
          <div className="text">남은시간</div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${count * 10}%` }}></div>
          </div>
          <div className="text">{correctAnswerCount} / {count}</div>
          <div className="guitar-image" ref={guitarRef}>
            <img src={`/img/notes/note${fret}${line}.png`} alt="Guitar" />
          </div>
          {/* <div className="count-container">
            <div>{3 - wrongAnswerCount}</div>
          </div> */}
          <div className="hint-container">

          </div>
          <div className="answer-options">
            {notes.map((note, index) => (
              <button key={index} onClick={() => handleNoteClick(note)}>
                {note}
              </button>
            ))}
          </div>
          {result && <div className="result">{result}</div>}
        </>
      )}
    </div>
  );
};

export default Note;
