import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import Kakao from "../assets/img/kakao.svg";

const Start = () => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    // 카카오 로그인 요청
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      window.location.href = kakaoLoginUrl; // 카카오 인증 URL로 리다이렉트
    } else {
      try {
        const response = await fetch(`/callback?code=${code}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const { nickName } = data;

          // 메인 페이지로 닉네임 전달하며 이동
          navigate("/main", { state: { nickName } });
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Title>냉장고 레시피</Title>
      <Image src={Logo} alt="냉장고 이미지" />

      <LinkButton to="/main">시작하기</LinkButton>

      <KakaoButton onClick={handleKakaoLogin}>
        <img src={Kakao} alt="Kakao Logo" />
        카카오로 계속하기
      </KakaoButton>
    </Container>
  );
};

export default Start;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #333;
`;

const Image = styled.img`
  width: 150px;
  height: 200px;
  margin-bottom: 3rem;
`;

const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 80%;
  max-width: 300px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 520;
  border: none;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  background-color: #f8f8f8;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const KakaoButton = styled(LinkButton).attrs({ as: "button" })`
  background-color: #fee500;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #ffd900;
  }
`;
