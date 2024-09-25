const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      // 실제 서비스 워커 파일인 /service-worker.js를 등록
      try {
        const response = await fetch('/service-worker.js', { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`서비스 워커 파일이 올바르게 로드되지 않았습니다. 상태 코드: ${response.status}`);
        }

        // 올바른 서비스 워커 파일 경로를 등록합니다.
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('서비스 워커가 등록되었습니다:', registration);
          })
          .catch((error) => {
            console.error('서비스 워커 등록 실패:', error);
          });
      } catch (error) {
        console.error('서비스 워커 파일 로드 실패:', error);
      }
    });
  }
};

export default registerServiceWorker;
