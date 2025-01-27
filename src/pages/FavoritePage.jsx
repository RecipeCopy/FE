import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import TabBar from "../components/TabBar"
import RecipeList from "../components/RecipeList"

const FavoritePage =({ favoriteRecipes, onToggleFavorite })=>{

    return(
        <PageContainer>
        <Header />
    
      {favoriteRecipes.length > 0 ? (
        <RecipeList
          recipes={favoriteRecipes}
          favoriteRecipes={favoriteRecipes}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <EmptyState>
          <EmptyIcon>📖</EmptyIcon>
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 50px;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #555;
`;