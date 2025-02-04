import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot 서버 주소
});

// 요청 시 Authorization 헤더 추가
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
