import React from 'react';
import './Modal.scss';

const Modal = ({ title, message, callback }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={callback}>확인</button>
      </div>
    </div>
  );
};

export default Modal;