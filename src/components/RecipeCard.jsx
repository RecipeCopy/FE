import React from "react";
import styled from "styled-components";


const RecipeCard = ({ recipe, onToggleFavorite, isFavorite }) => {
    return (
      <Card>
        <RecipeTitle>{recipe.recipeName}</RecipeTitle>
        <Ingredients>
          <span>재료 총 {recipe.ingredientsCount}개</span>
          <span>없는 재료: {recipe.missingIngredients.join(", ")}</span>
          <span>보유 재료: {recipe.ownedIngredients.join(", ")}</span>
        </Ingredients>
        <FavoriteIcon onClick={() => onToggleFavorite(recipe)}>
          {isFavorite ? "★" : "☆"}
        </FavoriteIcon>
      </Card>
    )
}

export default RecipeCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Ingredients = styled.div`
  font-size: 12px;
  color: #555;
  line-height: 1.5;
`;

const FavoriteIcon = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? "#FF6B6B" : "#CCC")};
`;