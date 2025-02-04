import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import RecipeList from "../components/RecipeList";
import RecipeBook from "../assets/img/recipebook.png";
import SearchBar from "../components/SearchBar";
import API from "../api/api"; 

const FavoritePage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await API.get("/scraps"); // ✅ 사용자의 스크랩 목록 가져오기
        setFavoriteRecipes(response.data); // 스크랩된 레시피 목록 저장
      } catch (err) {
        console.error("스크랩 데이터를 불러오는 중 오류 발생:", err);
        setError(err.response ? err.response.data : "서버 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Toparea>
        <Header />
        <SearchBar />
      </Toparea>
      <PageContainer>
        {loading ? (
          <Message>로딩 중입니다...</Message>
        ) : error ? (
          <Message>스크랩 데이터를 불러오지 못했습니다.</Message>
        ) : favoriteRecipes.length > 0 ? (
          <RecipeList recipes={favoriteRecipes} />
        ) : (
          <EmptyState>
            <EmptyImage src={RecipeBook} alt="즐겨찾기 없음" />
            <EmptyMessage>
              아직 즐겨찾기한 레시피가 없어요.
              <br />
              마음에 드는 레시피를 즐겨찾기에 추가해보세요!
            </EmptyMessage>
          </EmptyState>
        )}
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

const Message = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  text-align: center;
`;

const EmptyImage = styled.img`
  width: 120px;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #777;
`;

const Toparea = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0px;
`;
