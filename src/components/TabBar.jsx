import React from "react";
import { useState } from "react";
import styled from "styled-components";

const TabBar = () =>{
    const [activeTab, setActiveTab] = useState("냉장고");

    return (
        <TabBarContainer>
      <TabItem onClick={() => setActiveTab("냉장고")}>
        <img
          src={
            activeTab === "냉장고"
              ? "/선택된냉장고.png"
              : "/냉장고.png"
          }
          alt="냉장고 아이콘"
        />
        <span>나의 냉장고</span>
      </TabItem>
      <TabItem onClick={() => setActiveTab("레시피")}>
        <img
          src={
            activeTab === "레시피"
              ? "/선택된레시피.png"
              : "/레시피.png"
          }
          alt="레시피 아이콘"
        />
        <span>모든 레시피</span>
      </TabItem>
      <TabItem onClick={() => setActiveTab("즐겨찾기")}>
        <img
          src={
            activeTab === "즐겨찾기"
              ? "/선택된즐겨찾기.png"
              : "/즐겨찾기.png"
          }
          alt="즐겨찾기 아이콘"
        />
        <span>즐겨찾기</span>
      </TabItem>
    </TabBarContainer>
        
    )
}

export default TabBar;

const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  max-width: 393px;
`;

const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    margin-top: 4px;
    font-size: 12px;
    color: #333;
  }
`;