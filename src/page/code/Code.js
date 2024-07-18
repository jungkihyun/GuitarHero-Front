import { useState } from 'react';
import Button from '../../components/button/Button';
import './Code.scss';


const chords = [
  { name: 'C', variations: ['C', 'Cm', 'C5', 'C(add9)', 'Caug', 'Cdim7', 'Csus4', 'Csus2', 'C6', 'Cm6', 'C6/9'] },
  { name: 'D', variations: ['D', 'Dm', 'D5', 'D(add9)', 'Daug', 'Ddim7', 'Dsus4', 'Dsus2', 'D6', 'Dm6', 'D6/9'] },
  // 더 많은 코드와 변형을 추가
];

const Code = ({ openModal }) => {
  const [codeQuizBtn, setCodeQuizBtn] = useState(false);
  const [codeColBtn, setCodeColBtn] = useState(false);
  const [selectedChord, setSelectedChord] = useState(null);

  return (
    <div className='code-container'>
      <div className='tap-area'>
        <Button
          className={`primary ${codeQuizBtn ? 'active' : ''}`}
          onClick={() => {
            setCodeQuizBtn(!codeQuizBtn);
            setCodeColBtn(false);
          }}
          text={'코드문제'}
        >
        </Button>
        <Button
          className={`primary ${codeColBtn ? 'active' : ''}`}
          onClick={() => {
            setCodeQuizBtn(false);
            setCodeColBtn(!codeColBtn);
          }}
          text={'코드모음'}
        >
        </Button>
      </div>
      <div className='main-area'>
        <div className='title-area'>
          <span className='title'>C</span>
        </div>
        <div className='content-area'></div>
      </div>
      <div className='right-bar-area'>
        <div className='code-picker'>
          <h3>Chord Picker</h3>
          <div className='chord-list'>
            {chords.map((chord) => (
              <Button
                key={chord.name}
                className={`chord-button ${selectedChord === chord.name ? 'active' : ''}  btn primary`}
                onClick={() => setSelectedChord(chord.name)}
                text={chord.name}
              >
              </Button>
            ))}
          </div>
        </div>
        {selectedChord && (
          <div className='code-list'>
            <h4>{selectedChord} Variations</h4>
            <div className='variation-list'>
              {chords
                .find((chord) => chord.name === selectedChord)
                .variations.map((variation) => (
                  <Button
                    key={variation}
                    className='variation-button btn primary'
                    onClick={() => console.log(variation)}
                    text={variation}
                  >
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Code;