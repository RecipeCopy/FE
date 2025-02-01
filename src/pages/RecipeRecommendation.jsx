import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

const RecipeRecommend = () => {
  const location = useLocation();
  const selectedIngredients = location.state?.selectedIngredients || [];
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchRecommendedRecipes = async () => {
      try {
        const token = localStorage.getItem("token"); // 인증 토큰 가져오기
        const userId = localStorage.getItem("userId"); // 유저 ID 가져오기 (필요한 경우)
        
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

    
        const fridgeResponse = await axios.get(`${API_BASE_URL}/api/fridge/${userId}`, {
          headers,
        });
        const myFridgeIngredients = fridgeResponse.data; 

        const recipeResponse = await axios.post(
          `${API_BASE_URL}/api/recipes/recommend`,
          { ingredients: myFridgeIngredients },
          { headers }
        );

        setRecipes(recipeResponse.data); 
      } catch (err) {
        setError("레시피를 불러오는 데 실패했습니다.");
        console.error("레시피 추천 API 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedRecipes();
  }, [selectedIngredients]);

  return (
    <PageContainer>
      <Title>추천된 레시피</Title>
      {loading && <Message>로딩 중입니다...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && recipes.length === 0 && (
        <Message>추천할 레시피가 없습니다.</Message>
      )}
      <RecipeList>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index}>
            <RecipeName>{recipe.recipeName}</RecipeName>
            <Ingredients>필요한 재료: {recipe.ingredients.join(", ")}</Ingredients>
          </RecipeCard>
        ))}
      </RecipeList>
    </PageContainer>
  );
};

export default RecipeRecommend;

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Message = styled.p`
  text-align: center;
  color: #888;
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecipeCard = styled.div`
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #ff6b6b;
`;

const Ingredients = styled.p`
  font-size: 14px;
  color: #555;
`;
