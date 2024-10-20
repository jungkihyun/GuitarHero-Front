import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../../page/main/Main";
import Welcome from "../../page/welcome/Welcome";
import Note from "../../page/note/Note";
import Chord from "../../page/chord/Chord";
import Modal from "../../components/util/Modal";
import { useEffect, useState } from "react";
import Contact from "../../components/site/Contact";
import ErrorPage from '../error/ErrorPage'; // 커스텀 에러 페이지
import Tuning from "../../page/tuning/Tuning";
import GuitarTuner from "../../page/tuning/GuitarTuner";

const PageRouter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navigate = useNavigate();

  // navigate 함수를 전역에 등록
  useEffect(() => {
    window.navigateToErrorPage = () => navigate('/error'); // 에러 페이지로 이동하도록 설정
  }, [navigate]);

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
        <Route path="/error" element={<ErrorPage />} /> {/* 커스텀 에러 페이지 */}
        <Route path="/tuning" element={<Tuning />} /> {/* 커스텀 에러 페이지 */}
        <Route path="/GuitarTuner" element={<GuitarTuner />} /> {/* 커스텀 에러 페이지 */}
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
