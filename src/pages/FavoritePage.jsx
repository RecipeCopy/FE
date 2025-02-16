import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa"; 
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import API from "../api/api";
import SearchBar from "../components/SearchBar";

const FavoritePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Set());

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await API.get("/scraps");
        setRecipes(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : "서버 오류");
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await API.get("/scraps");
        const favoriteSet = new Set(response.data.map((scrap) => scrap.recipeName)); // Set으로 변환
        setFavoriteRecipes(favoriteSet);
      } catch (err) {
        console.error("즐겨찾기 데이터를 불러오는 중 오류 발생:", err);
      }
    };

    fetchRecipes();
    fetchFavorites();
  }, []);

  // 스크랩 추가/삭제 기능
  const toggleFavorite = async (recipeName) => {
    const isFavorited = favoriteRecipes.has(recipeName);
    try {
      if (isFavorited) {
        await API.delete(`/scraps/${recipeName}`);
        setFavoriteRecipes((prev) => {
          const updatedFavorites = new Set(prev);
          updatedFavorites.delete(recipeName);
          return updatedFavorites;
        });
      } else {
        await API.post(`/scraps/${recipeName}`);
        setFavoriteRecipes((prev) => {
          const updatedFavorites = new Set(prev);
          updatedFavorites.add(recipeName);
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.error("즐겨찾기 변경 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Toparea>
          <Header />
          <SearchBar />
      </Toparea>
      <PageContainer>
      <Content>        

        {loading && <Message>로딩 중입니다...</Message>}
        {error && <Message>데이터를 불러오지 못했습니다.</Message>}
        {!loading && !error && recipes.length === 0 && (
          <Message>스크랩한한 레시피가 없습니다.</Message>
        )}

        <RecipeList>
          {recipes
            .filter((recipe) => recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((recipe, index) => {
              const ingredientsArray = Array.isArray(recipe.ingredients)
                ? recipe.ingredients
                : recipe.ingredients
                ? recipe.ingredients.split(",")
                : [];

              const isFavorited = favoriteRecipes.has(recipe.recipeName);

              return (
                <RecipeCard key={index}>
                  <RecipeHeader>
                    <RecipeTitle>{recipe.recipeName}</RecipeTitle>
                    <FavoriteIcon onClick={() => toggleFavorite(recipe.recipeName)}>
                      {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
                    </FavoriteIcon>
                  </RecipeHeader>
                  <IngredientList>
                    <span>필요한 재료: </span>
                    {ingredientsArray.slice(0, 3).join(", ")}...
                  </IngredientList>
                  <RecipeInfo>재료 총 {ingredientsArray.length}개</RecipeInfo>
                </RecipeCard>
              );
            })}
        </RecipeList>
      </Content>
    </PageContainer>
    <TabBar />
    </>
  );
};

export default FavoritePage;

// 스타일링
const PageContainer = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  margin-top: 10px;
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

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const FavoriteIcon = styled.div`
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Toparea = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0px;
`;