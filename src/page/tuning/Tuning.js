import React, { useEffect, useRef, useState } from 'react';
import './Tuning.scss'
import AudioContext from "./AudioContext";
import autoCorrelate from "./AutoCorrelate";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "./Helpers";

const Tuning = ({ openModal }) => {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("C");
  const [pitchScale, setPitchScale] = useState("4");
  const [pitch, setPitch] = useState("0 Hz");
  const [detune, setDetune] = useState("0");
  // const [notification, setNotification] = useState(false);

  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();
  const buflen = 2048;
  var buf = new Float32Array(buflen);
  
  const noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const updatePitch = (time) => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      let note = noteFromPitch(ac);
      let sym = noteStrings[note % 12];
      let scl = Math.floor(note / 12) - 1;
      let dtune = centsOffFromPitch(ac, note);
      setPitch(parseFloat(ac).toFixed(2) + " Hz");
      setPitchNote(sym);
      setPitchScale(scl);
      setDetune(dtune);
      // setNotification(false);
      console.log(note, sym, scl, dtune, ac);
    }
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  setInterval(updatePitch, 1);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setStart(true);
    // setNotification(true);
    // setTimeout(() => setNotification(false), 5000);
    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
  };

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };

  return (
    <div className="tuning-wrapper">
      {/* <div
        className={
          notification
            ? "visible transition-all fixed top-0 bg-gray-400 text-white w-10/12 text-xs md:text-sm text-center py-4 mt-2 rounded-full shadow-2xl"
            : "invisible fixed top-0"
        }
      >
        Please, bring your instrument near to the microphone! {notification}
      </div> */}
      <div className="tuning-area">
          <div className="pitch-area">
            <span className="pitch-note">
              {pitchNote}
            </span>
            <span className="pitch-scale">
              {pitchScale}
            </span>
          </div>

          <div className="detune-area">
            <div
              className="detune left"
              style={{
                width: (detune < 0 ? getDetunePercent(detune) : "50") + "%",
              }}
            ></div>
            <span className="detune-between">I</span>
            <div
              className="detune right"
              style={{
                width: (detune > 0 ? getDetunePercent(detune) : "50") + "%",
              }}
            ></div>
          </div>
          <div className="pitch-text">
            <span>{pitch}</span>
          </div>
      </div>
      <div className="tuning-btn-area">
        {/* {!started ? ( */}
          <button
            className="tuning-btn"
            onClick={(e) => {
              !started ? start() : stop()
            }}
          >
            {!started ? 'START' : 'STOP'}
          </button>
        {/* ) : (
          <button
            className="tuning-btn"
            onClick={stop}
          >
            STOP
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Tuning;
