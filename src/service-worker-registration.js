const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('서비스 워커가 등록되었습니다:', registration);
        })
        .catch((error) => {
          console.error('서비스 워커 등록 실패:', error);
        });
    });
  }
};

export default registerServiceWorker;