/* eslint-disable no-restricted-globals */


// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('서비스 워커가 설치되었습니다.');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('서비스 워커가 활성화되었습니다.');
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('요청이 캐시 처리되었습니다.', event.request.url);
  });
  