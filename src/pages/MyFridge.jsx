import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const MyFridge = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]); // API에서 받아올 냉장고 재료 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [userId, setUserId] = useState(null); // 로그인한 유저 ID

  // 🛠️ 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
        if (!token) {
          alert("로그인이 필요합니다!");
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(response.data.userId); // userId 저장
      } catch (err) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", err);
        alert("로그인이 필요합니다!");
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  
  useEffect(() => {
    if (!userId) return; // userId가 없으면 실행하지 않음

    const fetchFridgeIngredients = async () => {
      const userId = localStorage.getItem("userId");
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/fridge/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIngredients(response.data); 
      } catch (err) {
        console.error("냉장고 데이터를 불러오는데 실패했습니다.", err);
        setError("냉장고 데이터를 가져올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFridgeIngredients();
  }, []); // userId가 변경될 때만 실행

  return (
    <PageContainer>
      <Header />

      <Content>
        {loading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : ingredients.length === 0 ? (
          <EmptyMessage>냉장고가 비었어요!</EmptyMessage>
        ) : (
          <IngredientsGrid>
            {ingredients.map((ingredient, index) => (
              <IngredientCard key={index}>
                <IngredientImage src={ingredient.img} alt={ingredient.name} />
                <IngredientName>{ingredient.name}</IngredientName>
              </IngredientCard>
            ))}
          </IngredientsGrid>
        )}
      </Content>

      {ingredients.length > 0 && (
        <ButtonWrapper>
          <RecommendRecipeButton
            onClick={() =>
              navigate("/recommend", { state: { selectedIngredients: ingredients } })
            }
          >
            냉장고 파먹기
          </RecommendRecipeButton>
        </ButtonWrapper>
      )}

      <TabBar />
    </PageContainer>
  );
};

export default MyFridge;

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #777;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #555;
  font-size: 16px;
  margin-top: 50px;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const IngredientCard = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const IngredientImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

const IngredientName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

const RecommendRecipeButton = styled.button`
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  background-color: #ff6b6b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff5252;
  }
`;
