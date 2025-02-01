import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import axios from "axios";


const API_BASE_URL = "http://localhost:8080";

const AllRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes`);
        console.log("레시피 데이터:", response.data);
        setRecipes(response.data);
      } catch (err) {
        console.error("레시피 불러오기 실패!", err);
        setError(err.response ? err.response.data : "서버 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <Header />
      <Content>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="요리하고 싶은 재료를 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        {loading && <Message>로딩 중입니다...</Message>}
        {error && <Message>데이터를 불러오지 못했습니다.</Message>}
        {!loading && !error && filteredRecipes.length === 0 && (
          <Message>검색된 레시피가 없습니다.</Message>
        )}

<RecipeList>
  {filteredRecipes.map((recipe, index) => {
    
    const ingredientsArray = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : recipe.ingredients ? recipe.ingredients.split(",") : [];

    return (
      <RecipeCard key={index}>
        <RecipeTitle>{recipe.recipeName}</RecipeTitle>
        <IngredientList>
          <span>필요한 재료: </span>
          {ingredientsArray.slice(0, 3).join(", ")}... {/* 일부만 표시 */}
        </IngredientList>
        <RecipeInfo>재료 총 {ingredientsArray.length}개</RecipeInfo>
      </RecipeCard>
    );
  })}
</RecipeList>

      </Content>
      <TabBar />
    </PageContainer>
  );
};

export default AllRecipePage;

const PageContainer = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none;
`;

const Message = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const RecipeCard = styled.div`
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const IngredientList = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const RecipeInfo = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;
