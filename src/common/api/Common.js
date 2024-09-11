// src/api/Common.js
import axios from 'axios';

// 환경 변수에서 baseURL 가져오기
const baseURL = process.env.REACT_APP_API_BASE_URL;

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 자격 증명 허용
});

// 요청 인터셉터 추가 (필요에 따라 수정 가능)
instance.interceptors.request.use(
  (config) => {
    // 요청 전 처리 로직 (토큰 추가 등)
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 성공적으로 응답을 받은 경우 처리
    return response;
  },
  (error) => {
    // 에러 발생 시 처리 로직
    // 공통 에러 처리 로직을 여기에 작성하여 try-catch를 대체
    console.error('API 요청 중 에러가 발생했습니다:', error.response || error.message);
    // 필요에 따라 에러 메시지를 사용자에게 알리거나 로그 처리 가능
    return Promise.reject(error); // 에러를 호출한 곳으로 전달
  }
);

// Common 객체 생성
const Common = {
  api: {
    get: (url, params = {}) => instance.get(url, { params }),
    post: (url, data = {}) => instance.post(url, data),
    put: (url, data = {}) => instance.put(url, data),
    delete: (url, params = {}) => instance.delete(url, { params }),
  },
};

// 글로벌 스코프에 Common 등록
window.Common = Common;

export default Common;
