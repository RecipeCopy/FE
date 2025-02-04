import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import TabBar from "../components/TabBar"
import RecipeList from "../components/RecipeList"
import RecipeBook from "../assets/img/recipebook.png";
import SearchBar from "../components/SearchBar"

const FavoritePage =({ favoriteRecipes = []})=>{

    return(
      <>
        <Toparea>
          <Header />
          <SearchBar/>
        </Toparea>
        <PageContainer>

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
    </PageContainer>

    <TabBar />
      </>
    )

}

export default FavoritePage;


const PageContainer = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
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

const Toparea = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0px;
`;