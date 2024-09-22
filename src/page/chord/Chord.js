import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome 사용
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // 필터 아이콘 가져오기
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
    const chordTypeMapping = {
      개방현코드: '1',
      오픈보이싱: '2',
      바레코드: '3',
    };

    // 선택된 필터를 숫자 코드로 변환하고 |로 연결
    const selectedChordType = selectedFilters
      .map((filter) => chordTypeMapping[filter])
      .join('|');
      
    const requestParameter = {
      selectedChordType: selectedChordType,
    };
    
    const result = await Common.api.get('/api/chord', requestParameter);
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
      correct: chord.chord,
      chordType: chord.chordType,
    })
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터 상태
  const filterRef = useRef(null); // 필터 컨테이너를 참조하기 위한 ref
  const [selectedFilters, setSelectedFilters] = useState(['개방현코드', '오픈보이싱', '바레코드']);

  useEffect(() => {
    // 필터가 열렸을 때만 이벤트 리스너 추가
    const handleClickOutside = (event) => {
      // 필터가 열려 있고, 클릭한 곳이 필터 컨테이너 내부가 아닌 경우 필터를 닫음
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // 필터 열고 닫기
  };

  const handleFilterChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    clearNoteGrid()
  }, [selectedFilters])
  

  return (
    <div className="note-wrapper">
      <div className="filter-container" ref={filterRef}>
        {/* 필터 텍스트 앞에 아이콘 추가 */}
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
      
      {/* <div className='filter-container'>
        {correct}
      </div> */}
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