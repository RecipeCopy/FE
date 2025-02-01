import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import TabBar from "../components/TabBar"
import RecipeList from "../components/RecipeList"
import RecipeBook from "../assets/img/recipebook.png";

const FavoritePage =({ favoriteRecipes = []})=>{

    return(
        <PageContainer>
        <Header />
    
        <SearchContainer>
        <SearchInput type="text" placeholder="요리하고 싶은 재료를 검색해보세요." />
    
      </SearchContainer>

      {favoriteRecipes.length > 0 ? (
        <RecipeList
          recipes={favoriteRecipes}
          favoriteRecipes={favoriteRecipes}
          onToggleFavorite={onToggleFavorite}
        />
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

      <TabBar />
    </PageContainer>
    )

}

export default FavoritePage;


const PageContainer = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  margin: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  font-size: 14px;
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