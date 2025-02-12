import React from "react";
import styled from "styled-components";

const IngredientCard = ({ ingredient, selected, onClick }) => {


  if (!ingredient || typeof ingredient !== "object" || !ingredient.name) {
    console.error("Invalid ingredient data:", ingredient);
    return null;
  }

  return (
    <Card selected={selected} onClick={() => onClick(ingredient)}>
      <IngredientImage 
        src={ingredient.img || "/images/default.png"} 
        alt={ingredient.name || "이름 없음"} 
        onError={(e) => e.target.src = "/images/default.png"} 
      />
      <IngredientName>{ingredient.name || "이름 없음"}</IngredientName>
    </Card>
  );
};

export default IngredientCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 2px solid ${(props) => (props.selected ? "#ff6b6b" : "#ddd")};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => (props.selected ? "#ffecec" : "white")};
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#ffdddd" : "#f8f8f8")};
  }
`;

const IngredientImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const IngredientName = styled.p`
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
`;
