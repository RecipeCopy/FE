import React from "react";
import { useNavigate } from "react-router-dom";
import IconImage from "./img/icon.png";
import KakaoImage from "./img/kakao.png";
import styled, {createGlobalStyle} from "styled-components";

const Start = () => {
  const navigate =useNavigate();

  const handleStart = () =>{
    navigate("/main");
  };

  
    return (
      <>
      <GlobalStyle />
      <StartContainer>
        <Title>냉장고 레시피</Title>
        <Icon src = {IconImage} alt="냉장고레시피 아이콘"/>
        <StartButton
        onClick={handleStart}>시작하기</StartButton>
        <KakaoButton>
          <KakaoIcon src= {KakaoImage} alt = "카카오 아이콘" />
          카카오로 계속하기</KakaoButton>
      </StartContainer>
      </>
    );
  };


  
export default Start;

const GlobalStyle = createGlobalStyle`
*{
  margin : 0;
  padding : 0;
  box-sizing :border-box;
}`

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333333;
  margin-bottom: 50px;
`;

const Icon = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 80px;
`;

const StartButton = styled.button`
  width: 80%;
  padding: 15px 0;
  margin-bottom: 10px;
  background-color: #ffffff;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #dddddd;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const KakaoButton = styled.button`
  width: 80%;
  padding: 15px 0;
  background-color: #fee500;
  color: #3c1e1e;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;

  &:hover {
    background-color: #ffd700;
  }
`;

const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
`;