import React from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import styled from "styled-components";

const MyFridge = ({ingredients, setIngredients})=>{

    const handleAddIngredient = (ingredients)=>{
        setIngredients(ingredients.filter((item)=>item!==ingredients));
    };

    return (
        <PageContainer>
        <Header />
        <Content>
          {ingredients.length === 0 ? (
            <EmptyMessage>냉장고가 비었어요!</EmptyMessage>
          ) : (
            <IngredientsGrid>
              {ingredients.map((ingredient, index) => (
                <IngredientCard key={index}>
                    <IngredientImage src={ingredient.img} alt={ingredient.name} />
                    <IngredientName>{ingredient.name}</IngredientName>
                </IngredientCard>
              ))}
            </IngredientsGrid>
          )}
        </Content>
        <TabBar />
      </PageContainer> 
    )
}

export default MyFridge;

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #555;
  font-size: 16px;
  margin-top: 50px;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const IngredientCard = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const IngredientImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

const IngredientName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin:0;
`;