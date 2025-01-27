import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nickName, setNickName] = useState("사용자"); // 닉네임 기본값 설정
  const navigate = useNavigate();

  // URL 파라미터 또는 sessionStorage에서 닉네임 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlNickName = params.get("nickName");

    if (urlNickName) {
      setNickName(urlNickName);
      sessionStorage.setItem("nickName", urlNickName); // 닉네임 저장
    } else {
      const storedNickName = sessionStorage.getItem("nickName");
      if (storedNickName) {
        setNickName(storedNickName);
      }
    }
  }, []);

  const handleAddIngredient = () => {
    navigate("/add");
  };

  const handleTakePhoto = () => {
    console.log("카메라 연결 실행");
  };

  return (
    <>
      <Header onAddClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <MenuContainer>
          <MenuButton onClick={handleAddIngredient}>
            ➕ 재료 추가하기
          </MenuButton>
          <MenuButton onClick={handleTakePhoto}>
            ➕ 재료 사진찍기
          </MenuButton>
        </MenuContainer>
      )}
      <Content>
        <EmptyMessage>
          {nickName}님의 <br />
          냉장고가 비었어요!
        </EmptyMessage>
      </Content>
      <TabBar />
    </>
  );
};

export default Main;

const MenuContainer = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const MenuButton = styled.button`
  background-color: #fff;
  color: black;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;

const Content = styled.div`
  margin-top: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #555;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
`;