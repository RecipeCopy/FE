import React from "react";
import styled from "styled-components";

const RecipeCard = ({ recipe, userIngredients }) => {
  // 레시피의 재료를 배열로 변환
  const recipeIngredients = recipe.ingredients
    .split(/[,\n]/) // 쉼표(,)나 줄바꿈(\n) 기준으로 분리
    .map((item) => item.trim()) 

  // 보유 재료: 레시피에 포함된 재료 중 내 냉장고에 있는 재료
  const ownedIngredients = recipeIngredients.filter((ingredient) =>
    userIngredients.includes(ingredient)
  );

  // 없는 재료: 레시피에 필요하지만 냉장고에 없는 재료
  const missingIngredients = recipeIngredients.filter(
    (ingredient) => !userIngredients.includes(ingredient)
  );

  return (
    <Card>
      <RecipeTitle>{recipe.recipeName}</RecipeTitle>
      <IngredientInfo>
        <HighlightText>{ownedIngredients.length}개 재료 보유</HighlightText>
        <TotalIngredients>재료 총 {recipeIngredients.length}개</TotalIngredients>
      </IngredientInfo>

      <IngredientsContainer>
        <IngredientBlock>
          <IngredientLabel>없는 재료</IngredientLabel>
          {missingIngredients.length > 0 ? (
            <IngredientText>{missingIngredients.join(", ")}</IngredientText>
          ) : (
            <IngredientText>없음</IngredientText>
          )}
        </IngredientBlock>

        <IngredientBlock>
          <IngredientLabel>보유 재료</IngredientLabel>
          {ownedIngredients.length > 0 ? (
            <IngredientText>{ownedIngredients.join(", ")}</IngredientText>
          ) : (
            <IngredientText>없음</IngredientText>
          )}
        </IngredientBlock>
      </IngredientsContainer>
    </Card>
  );
};

export default RecipeCard;


const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
`;

const RecipeTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const IngredientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const HighlightText = styled.span`
  color: #ff7f00;
  font-weight: bold;
`;

const TotalIngredients = styled.span`
  font-size: 13px;
  color: #aaa;
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 6px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
`;

const IngredientBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const IngredientLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #555;
  margin-bottom: 2px;
`;

const IngredientText = styled.span`
  font-size: 13px;
  color: #333;
`;
