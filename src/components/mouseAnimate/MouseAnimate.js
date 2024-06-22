import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './MouseAnimate.scss';

const MouseAnimate = () => {
  const [notes, setNotes] = useState([]);
  const lastNoteTimeRef = useRef(Date.now());
  const noteImages = ['music-note1.png', 'music-note2.png', 'music-note3.png'];

  useEffect(() => {
    const handleMouseMove = (event) => {
      const currentTime = Date.now();
      if (currentTime - lastNoteTimeRef.current > 150) { // 70ms마다 음표 생성
        const newNote = {
          id: uuidv4(), // 고유한 ID 생성
          left: event.clientX + 10, // 음표의 반 너비만큼 좌표를 조정
          top: event.clientY + 15,  // 음표의 반 높이만큼 좌표를 조정
          image: noteImages[Math.floor(Math.random() * noteImages.length)] // 랜덤 이미지 선택
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
        lastNoteTimeRef.current = currentTime;

        setTimeout(() => {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== newNote.id));
        }, 2000); // 음표가 2초 후 사라짐
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="note-fall-container">
      {notes.map((note) => (
        <div
          key={note.id} // 고유한 키 사용
          className="note"
          style={{ left: note.left, top: note.top, backgroundImage: `url(/img/${note.image})` }} // 랜덤 이미지 적용
        ></div>
      ))}
    </div>
  );
};

export default MouseAnimate;
