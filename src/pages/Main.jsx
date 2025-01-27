import React, { useState } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddIngredient = () =>{
    navigate("/add");

  };

  const handleTakePhoto = () =>{
    console.log("카메라 연결 실행");

  };


    return (
        <>
          <Header onAddClick={()=> setIsMenuOpen(!isMenuOpen)}/>
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
          <TabBar />
        </>
    );
  };
  
export default Main;

const MenuContainer = styled.div`
  position: fixed;
  top:40px;
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
  color: balck;
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