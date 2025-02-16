import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import TabBar from "../components/TabBar";

const API_BASE_URL = "http://localhost:8080";

const RecipeRecommendation = () => {
  const navigate = useNavigate();
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const fridgeResponse = await axios.get(`${API_BASE_URL}/api/fridge`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fridgeItems = fridgeResponse.data.map((item) => item.ingredientName);
        setFridgeIngredients(fridgeItems);

        const recipeResponse = await axios.get(`${API_BASE_URL}/api/recipes/recommend`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecommendedRecipes(recipeResponse.data);
      } catch (error) {
        console.error("레시피 추천 데이터 불러오기 실패:", error);
        alert("레시피 추천 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedRecipes();
  }, []);

  const filteredRecipes = recommendedRecipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <Header />
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="요리하고 싶은 재료를 검색해보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      {isLoading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : filteredRecipes.length === 0 ? (
        <EmptyMessage>추천할 수 있는 레시피가 없습니다. 재료를 추가해보세요!</EmptyMessage>
      ) : (
        <RecipeList>
          {filteredRecipes.map((recipe, index) => {
            // 불필요한 문자 제거하고 숫자 제거 (감자 20g → 감자)
            const cleanedIngredients = recipe.ingredients
            .split(/[\n,\s]+/) // 줄바꿈, 쉼표, 공백 기준으로 분리
            .map((ing) =>
              ing.replace(/\s*\d+(\.\d+)?(g|kg|ml|L|cc|개|모|줌|큰술|작은술)?(\s*\([^)]*\))?$/, "").trim()
            ) // 숫자+단위 및 괄호 안의 정보까지 제거
            .filter((ing) => ing !== "-" && ing !== ":" && ing !== "주재료" && ing.length > 0); // 불필요한 기호, 빈 문자열 제거

          
          const matchedIngredients = fridgeIngredients.filter((ing) =>
            cleanedIngredients.includes(ing)
          );
          const missingIngredients = cleanedIngredients.filter(
            (ing) => !fridgeIngredients.includes(ing)
          );

            // "없는 재료" 최대 3개까지만 표시 + 나머지는 '외 X개'로 축약
            const displayedMissing = missingIngredients.slice(0, 3).filter((ing) => ing.length > 0);
            const hiddenCount = missingIngredients.length - displayedMissing.length;
            const missingText =
              displayedMissing.length > 0
                ? displayedMissing.join(", ") + (hiddenCount > 0 ? ` 외 ${hiddenCount}개` : "")
                : "없음";

            return (
              <RecipeCard key={index}>
                <RecipeHeader>
                  <RecipeTitle>{recipe.recipeName}</RecipeTitle>
                  <IngredientInfo>
                    <Highlight>{matchedIngredients.length}개 재료 보유</Highlight> · 총{" "}
                    {cleanedIngredients.length}개
                  </IngredientInfo>
                </RecipeHeader>

                <IngredientContainer>
                  {/* 없는 재료 */}
                  <IngredientRow>
                    <IngredientLabel>없는 재료</IngredientLabel>
                    <IngredientList>{missingText}</IngredientList>
                  </IngredientRow>
                  {/* 보유 재료 */}
                  <IngredientRow>
                    <IngredientLabel>보유 재료</IngredientLabel>
                    <IngredientList>
                      {matchedIngredients.length > 0 ? matchedIngredients.join(", ") : "없음"}
                    </IngredientList>
                  </IngredientRow>
                </IngredientContainer>
              </RecipeCard>
            );
          })}
        </RecipeList>
      )}

      <TabBar />
    </PageContainer>
  );
};

export default RecipeRecommendation;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
`;

const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 5px;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #777;
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  color: #777;
  text-align: center;
`;

const RecipeList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecipeCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const RecipeHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const RecipeTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const IngredientInfo = styled.span`
  font-size: 12px;
  color: gray;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #ff7f00;
`;

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IngredientLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: gray;
`;

const IngredientList = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0;
`;
