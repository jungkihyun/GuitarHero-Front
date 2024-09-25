import React, { useEffect, useRef, useState } from 'react';

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
    E4: 325.63, // 1번 줄 (가장 얇은 줄)
    B3: 242.94, // 2번 줄
    G3: 192.00, // 3번 줄
    D3: 142.83, // 4번 줄
    A2: 106.00, // 5번 줄
    E2: 78.41,  // 6번 줄 (가장 굵은 줄)
  };


  useEffect(() => {
    // 마이크 설정
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(2048, 1, 1);

      analyserRef.current.fftSize = 2048;
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(audioContextRef.current.destination);

      scriptProcessorRef.current.onaudioprocess = () => {
        const dataArray = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(dataArray);

        const rms = calculateRMS(dataArray);
        setIsSoundDetected(rms > 0.01);

        const detectedFrequency = calculateFrequency(dataArray, audioContextRef.current.sampleRate);
        setFrequency(detectedFrequency);
        if (selectedString) updateTuningStatus(detectedFrequency, selectedString);
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

    // 오차 허용 범위 설정 (예: ±3 Hz)
    const tolerance = 10;

    if (Math.abs(diff) < tolerance) {
      setTuningStatus(`${stringName} - 튜닝 완료`);
    } else if (diff > 0) {
      setTuningStatus(`${stringName} - 음정이 높습니다`);
    } else {
      setTuningStatus(`${stringName} - 음정이 낮습니다`);
    }
  };


  // 줄 선택 핸들러
  const handleStringSelect = (string) => {
    setSelectedString(string);
    setTuningStatus('소리 감지 중...');
  };

  return (
    <div className="tuner">
      <h2>기타 튜닝</h2>
      <div className="string-selection">
        {Object.keys(targetFrequencies).map((string, index) => (
          <button
            key={index}
            onClick={() => handleStringSelect(string)}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: selectedString === string ? 'lightblue' : 'white',
            }}
          >
            {`${6 - index}번 줄 (${string})`}
          </button>
        ))}
      </div>
      <div
        className={`sound-indicator ${isSoundDetected ? 'active' : ''}`}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isSoundDetected ? 'green' : 'red',
          margin: '10px',
        }}
      ></div>
      <p>감지된 주파수: {frequency ? frequency.toFixed(2) + ' Hz' : '감지 중...'}</p>
      <p>튜닝 상태: {tuningStatus}</p>
      <button onClick={openModal}>도움말 보기</button>
    </div>
  );
};

export default Tuning;
