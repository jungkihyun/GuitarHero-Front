import { Route, Routes } from "react-router-dom";
import Main from "../../page/main/Main";
import Welcome from "../../page/welcome/Welcome";
import Note from "../../page/note/Note";
import Chord from "../../page/chord/Chord";
import Modal from "../../components/util/Modal";
import { useState } from "react";
import Contact from "../../components/site/Contact";

const PageRouter = () => {
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
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/welcome" element={<Welcome openModal={openModal} />} />
        <Route path="/note" element={<Note openModal={openModal}/>} />
        <Route path="/chord" element={<Chord openModal={openModal} />} />
        <Route path="/contact" element={<Contact openModal={openModal} />} />
      </Routes>
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
    </>
  );
}

export default PageRouter;
