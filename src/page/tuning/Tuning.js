import React, { useEffect, useRef, useState } from 'react';
import './Tuning.scss'

const Tuning = ({ openModal }) => {
  const [frequency, setFrequency] = useState(null);
  const [tuningStatus, setTuningStatus] = useState('');
  const [isSoundDetected, setIsSoundDetected] = useState(false);
  const [selectedString, setSelectedString] = useState(null); // 선택된 줄 상태
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const scriptProcessorRef = useRef(null);

  // 기타 줄별 표준 주파수 (1번 줄부터 6번 줄 순서)
  const targetFrequencies = {
    E2: 82.41,  // 6번 줄 (가장 굵은 줄)
    A2: 110.00, // 5번 줄
    D3: 146.83, // 4번 줄
    G3: 196.00, // 3번 줄
    B3: 246.94, // 2번 줄
    E4: 329.63, // 1번 줄 (가장 얇은 줄)
  };


  useEffect(() => {
    // 마이크 설정
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
  
      // Lowpass 필터 추가 - 저주파에 민감하게
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = "lowpass"; 
      filter.frequency.setValueAtTime(200, audioContextRef.current.currentTime); // 200Hz 이하만 통과
      
      // 마이크 -> 필터 -> 분석기 연결
      microphoneRef.current.connect(filter);
      filter.connect(analyserRef.current);
  
      // 더 긴 버퍼 크기 사용
      scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      analyserRef.current.fftSize = 8192; // fftSize를 8192로 증가하여 저주파 감지 성능 향상
      analyserRef.current.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(audioContextRef.current.destination);
  
      scriptProcessorRef.current.onaudioprocess = () => {
        const dataArray = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(dataArray);
  
        const rms = calculateRMS(dataArray);
        setIsSoundDetected(rms > 0.01);
  
        const detectedFrequency = calculateFrequency(dataArray, audioContextRef.current.sampleRate);
        
        if (detectedFrequency) {
          // 배음 필터링 - 감지된 주파수가 기대 주파수의 배음일 경우 조정
          let actualFrequency = detectedFrequency;
          while (actualFrequency > targetFrequencies[selectedString] * 1.5) {
            actualFrequency /= 2;
          }
  
          setFrequency(actualFrequency);
          if (selectedString) updateTuningStatus(actualFrequency, selectedString);
        }
      };
    });
  
    // 리소스 정리
    return () => {
      scriptProcessorRef.current?.disconnect();
      analyserRef.current?.disconnect();
      microphoneRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [selectedString]);
  

  // 주파수 계산 함수
  const calculateFrequency = (buffer, sampleRate) => {
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    let correlations = [];

    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    // if (rms < 0.01) return null;
    if (rms < 0.01) return null;

    let lastCorrelation = 1;
    for (let offset = 0; offset < buffer.length / 2; offset++) {
      let correlation = 0;

      for (let i = 0; i < buffer.length / 2; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }
      correlation = 1 - correlation / (buffer.length / 2);
      correlations[offset] = correlation;
      if (correlation > 0.9 && correlation > lastCorrelation) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        const shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
        return sampleRate / (bestOffset + 8 * shift);
      }
      lastCorrelation = correlation;
    }
    return null;
  };

  // RMS 계산 함수
  const calculateRMS = (buffer) => {
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    return Math.sqrt(rms / buffer.length);
  };

  // 튜닝 상태 업데이트 함수
  const updateTuningStatus = (detectedFrequency, stringName) => {
    if (!detectedFrequency) {
      setTuningStatus('소리 없음');
      return;
    }
  
    const targetFrequency = targetFrequencies[stringName];
  
    const diff = detectedFrequency - targetFrequency;

    const tolerance = 5;
    if (Math.abs(diff) < tolerance) setTuningStatus(`${stringName} - 튜닝 완료`);
    else if (diff > 0) setTuningStatus(`${stringName} - 음정이 높습니다`);
    else setTuningStatus(`${stringName} - 음정이 낮습니다`);
  };

  const handleStringSelect = (string) => {
    setSelectedString(string);
    setTuningStatus('소리 감지 중...');
  };

  const getMarkerPosition = () => {
    if (!frequency || !selectedString) return 50; // 중앙 (좌우 50% 위치)
    const targetFrequency = targetFrequencies[selectedString];
    const diff = frequency - targetFrequency;
    const maxDiff = 50; // 50% 좌우로 최대 이동
    const position = 50 + (diff / targetFrequency) * maxDiff;
    return Math.max(0, Math.min(100, position)); // 0% ~ 100% 범위로 제한
  };

  return (
    <div className="tuning-wrapper">
      <div className="a-area">
        <div className="marker" style={{ left: `${getMarkerPosition()}%` }} />
        <div className="center-line" />
      </div>
      <div className="b-area">
        <div className="guitar-image">
          {Object.keys(targetFrequencies).map((string, index) => (
            <button
              key={index}
              onClick={() => handleStringSelect(string)}
              className="string-button"
              // style={[0, 1, 2].indexOf(index) > -1 ? { top: `${index * 15 + 10}%`, left: `-30%` } : { top: `${index * 15 + 10}`, left: `100%`}}
            >
              {`${6 - index}번 줄 (${string})`}
            </button>
          ))}
        </div>
      </div>
      <p>튜닝 상태: {tuningStatus} ({frequency})</p>
      <button onClick={openModal}>도움말 보기</button>
    </div>
  );
};

export default Tuning;
