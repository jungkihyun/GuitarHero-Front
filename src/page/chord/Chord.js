import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFilter } from '@fortawesome/free-solid-svg-icons'; 
import Button from '../../components/button/Button';
import './Chord.scss';
import NoteGrid from '../../components/noteGrid/NoteGrid';
import Common from '../../common/api/Common';
import { useNavigate } from 'react-router-dom';
import { context, Sampler, Volume } from 'tone';
import { Tone } from 'tone/build/esm/core/Tone';

const Chord = ({ openModal }) => {
  const navigate = useNavigate();
  const [detailChordBtns, setDetailChordBtns] = useState();
  const [successResult, setSuccessResult] = useState(false);
  const [failResult, setFailResult] = useState(false);
  const timeoutRef = useRef(null);
  const [startFret, setStartFret] = useState(0);
  const [correct, setCorrect] = useState();
  const [noteObj, setNoteObj] = useState({
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    line5: '',
    line6: '',
  });
  const [chord, setChord] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState(['개방현코드', '오픈보이싱', '바레코드']);
  const [synth, setSynth] = useState(null);

  const handleNoteClick = (note) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (note === correct) {
      setSuccessResult(true);
      setFailResult(false);
      clearNoteGrid();
    } else {
      setSuccessResult(false);
      setFailResult(true);
    }

    timeoutRef.current = setTimeout(() => {
      setSuccessResult(false);
      setFailResult(false);
    }, 700);
  };

  const clearNoteGrid = async () => {
    const chordTypeMapping = {
      개방현코드: '1',
      오픈보이싱: '2',
      바레코드: '3',
    };

    const selectedChordType = selectedFilters.map((filter) => chordTypeMapping[filter]).join('|');
    const requestParameter = { selectedChordType: selectedChordType };
    try {
      const result = await Common.api.get('/api/chord', requestParameter);
      const chord = result.data.data;
      setChord(chord);
      setCorrect(chord.chord);
      setDetailChordBtns(chord.chordButtons);
      setStartFret(chord.start - 1);
      setNoteObj({
        line1: chord.line1,
        line2: chord.line2,
        line3: chord.line3,
        line4: chord.line4,
        line5: chord.line5,
        line6: chord.line6,
        correct: chord.chord,
        chordType: chord.chordType,
      });
      
      setStringStates((prevStates) => {
        // 기존 상태 배열을 복사
        const updatedStates = [...prevStates];
    
        // 특정 인덱스의 줄 상태를 수정
        // chord.line*n* 특정 라인인 line1 ~ line6은 updatedStates의 fret에서는 반대임.
        updatedStates[0] = {
          ...updatedStates[0], // 기존 줄 상태 복사
          fret: Number(chord.line6.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line6.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
        updatedStates[1] = {
          ...updatedStates[1], // 기존 줄 상태 복사
          fret: Number(chord.line5.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line5.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
        updatedStates[2] = {
          ...updatedStates[2], // 기존 줄 상태 복사
          fret: Number(chord.line4.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line4.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
        updatedStates[3] = {
          ...updatedStates[3], // 기존 줄 상태 복사
          fret: Number(chord.line3.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line3.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
        updatedStates[4] = {
          ...updatedStates[4], // 기존 줄 상태 복사
          fret: Number(chord.line2.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line2.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
        updatedStates[5] = {
          ...updatedStates[5], // 기존 줄 상태 복사
          fret: Number(chord.line1.substring(0, 1)) + (chord.start - 1),   // 프렛 값 수정
          muted: chord.line1.substring(1, 2) === 'X' ? true : false,         // 뮤트 값 수정
        };
    
        // 수정된 상태 배열 반환
        return updatedStates;
      });
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    clearNoteGrid();
  }, [selectedFilters]);

  const volumeNode = useRef(new Volume(15).toDestination()); // 볼륨 노드를 추가하여 초기 볼륨을 설정 (5 dB로 증폭)
  // 각 줄의 상태를 저장하는 상태 배열 (프렛 번호와 뮤트 상태)
  // 1번줄부터 6번줄까지 아래로
  const [stringStates, setStringStates] = useState([
    { string: 'E2', fret: 0, muted: true },
    { string: 'A2', fret: 3, muted: false },
    { string: 'D3', fret: 5, muted: false },
    { string: 'G3', fret: 3, muted: false },
    { string: 'B3', fret: 6, muted: false },
    { string: 'E4', fret: 3, muted: false },
  ]);

  // Sampler 초기화
  const initializeSynth = () => {
    const guitarSynth = new Sampler({
      urls: {
        E2: 'E2.mp3',
        A2: 'A2.mp3',
        D3: 'D3.mp3',
        G3: 'G3.mp3',
        B3: 'B3.mp3',
        E4: 'E4.mp3',
      },
      baseUrl: 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/acoustic_guitar_nylon-mp3/', // 샘플 파일이 저장된 경로
      // baseUrl: 'https://react-guitar.com/samples/', // 샘플 파일이 저장된 경로
      onload: () => {
        console.log('기타 사운드 로드 완료');
        setSynth(guitarSynth);
      },
      synth: 'acoustic_guitar_nylon',
    }).connect(volumeNode.current); // 볼륨 노드에 연결하여 소리 증폭
  };

  useEffect(() => {
    initializeSynth();
    activateAudioContext();
  }, [])

  // 특정 줄의 프렛과 뮤트 상태에 따라 음 재생
  const playStroke = () => {
    // 오디오 컨텍스트가 존재하고 'suspended' 상태이면 resume()으로 활성화
    if (synth && synth.context.state === 'suspended') {
      synth.context.resume().then(() => {
        console.log('오디오 컨텍스트가 활성화되었습니다.');
        triggerSound(); // 오디오 컨텍스트 활성화 후 사운드 재생 함수 호출
      }).catch(error => {
        console.error('오디오 컨텍스트 활성화 중 오류 발생:', error);
      });
    } else {
      triggerSound(); // 이미 활성화된 경우 사운드 재생
    }
  };
  
  // 실제 사운드를 재생하는 함수
  const triggerSound = () => {
    if (synth) {
      stringStates.forEach((stringState, index) => {
        const { string, fret, muted } = stringState;
        if (!muted) {
          const note = getNoteFromFret(string, fret); // 줄과 프렛 정보에 따라 음을 계산
          synth.triggerAttackRelease(note, '2n', synth.context.now() + index * 0.12);
        }
      });
    }
  };
  

  // // 줄과 프렛에 따라 음을 계산하는 함수
  const getNoteFromFret = (string, fret) => {
    // 각 줄의 기본 MIDI 번호
    const baseNotes = {
      E2: 40, // MIDI 노트 번호
      A2: 45,
      D3: 50,
      G3: 55,
      B3: 59,
      E4: 64,
    };
  
    // MIDI 번호를 음계 이름으로 변환하는 배열
    const noteNames = [
      'C0', 'C#0', 'D0', 'D#0', 'E0', 'F0', 'F#0', 'G0', 'G#0', 'A0', 'A#0', 'B0', // 옥타브 0
      'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', // 옥타브 1
      'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', // 옥타브 2
      'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', // 옥타브 3
      'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', // 옥타브 4
      'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', // 옥타브 5
      'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', // 옥타브 6
      'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', // 옥타브 7
      'C8', 'C#8', 'D8', 'D#8', 'E8', 'F8', 'F#8', 'G8', 'G#8', 'A8', 'A#8', 'B8', // 옥타브 8
      'C9', 'C#9', 'D9', 'D#9', 'E9', 'F9', 'F#9', 'G9', 'G#9', 'A9', 'A#9', 'B9', // 옥타브 9
      'C10', 'C#10', 'D10', 'D#10', 'E10', 'F10', 'F#10', 'G10', 'G#10', 'A10', 'A#10', 'B10', // 옥타브 10
      // 더 확장 가능
    ];
  
    // 기본 줄의 음에서 프렛 수를 더한 MIDI 번호 계산
    const midiNote = baseNotes[string] + fret;
  
    // MIDI 번호를 음계 이름으로 변환하여 반환
    const noteName = noteNames[midiNote % 12];
    const octave = Math.floor(midiNote / 12) - 1;
  
    return `${noteName}${octave}`; // 예: E2, G#3 등 정확한 음 반환
  };

  // 오디오 컨텍스트 활성화 함수
  const activateAudioContext = () => {
    if (synth && synth.context.state === 'suspended') {
      synth.context.resume().then(() => {
        console.log('오디오 컨텍스트가 활성화되었습니다.');
      });
    }
  };

  return (
    <div className="note-wrapper">
      <div className="filter-container" ref={filterRef}>
        <span onClick={toggleFilter} className="filter-text">
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
          필터
        </span>
        {isFilterOpen && (
          <div className="filter-options">
            {['개방현코드', '오픈보이싱', '바레코드'].map((filter, index) => (
              <label key={index} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => handleFilterChange(filter)}
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="note-result-container">
        <div className={`note-result success ${successResult ? 'active' : ''}`}>정답입니다!</div>
        <div className={`note-result fail ${failResult ? 'active' : ''}`}>오답입니다.</div>
      </div>
      <div className="note-container">
        <div className="note-grid">
          <NoteGrid type={'chord'} startFret={startFret} noteObj={noteObj} playStroke={playStroke} />
        </div>
        <div className="chord-btn-container">
          <div className="chord-btn-detail">
            {chord?.chordButtons?.map((data, dataIdx) => (
              <button key={dataIdx} onClick={() => handleNoteClick(data)}>
                {data}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chord;
