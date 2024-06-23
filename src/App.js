import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Main from './components/main/Main';
import Welcome from './components/welcome/Welcome';
import Note from './components/note/Note';

import Modal from './components/util/Modal';
import MouseAnimate from './components/mouseAnimate/MouseAnimate';
import Layout from './common/layout/Layout'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (title, message, callback) => {
    setModalContent({ title, message, callback });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
  };

  return (
    <Router>
      <MouseAnimate />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/welcome" element={<Welcome openModal={openModal} />} />
          <Route path="/note" element={<Note openModal={openModal} />} />
        </Routes>
      </Layout>
      {modalOpen && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          callback={() => {
            modalContent.callback();
            closeModal();
          }}
        />
      )}
    </Router>
  );
}

export default App;
