import React from "react";
import styled from "styled-components";


const RecipeCard = ({ recipe }) => {
    return (
      <Card>
        <RecipeTitle>{recipe.recipeName}</RecipeTitle>
        <Ingredients>{recipe.ingredients}</Ingredients>
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

const Ingredients = styled.p`
    font-size: 12px;
    color: #555;
    line-height: 1.5;
`;