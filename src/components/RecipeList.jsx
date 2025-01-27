import React from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard.jsx";

const RecipeList = ({ recipes, onToggleFavorite, favoriteRecipes }) => {
    return (
      <ListContainer>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favoriteRecipes.some((fav) => fav.id === recipe.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ListContainer>
    );
  };
  
  export default RecipeList;
  
  const ListContainer = styled.div`
    margin-top: 16px;
    padding: 0 16px;
  `;