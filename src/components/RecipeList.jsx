import React from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard.jsx";

const RecipeList = ({ recipes }) => {
    return (
      <ListContainer>
        {recipes.map((recipe,index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
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