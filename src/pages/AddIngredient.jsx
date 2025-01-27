import React, {useState} from "react";
import styled from "styled-components";
import IngredientData from "../components/Ingredients.jsx";
import Header from "../components/Header.jsx";


const AddIngredient = ()=>{
     const [selectedIngredients, setSelectedIngredients] = useState([]);
     const [searchTerm, setSearchTerm] = useState(); 

     const toggleIngredient = (ingredient) =>{ 
        if(selectedIngredients.includes(ingredient)){
            setSelectedIngredients(
                selectedIngredients.filter((item)=> item !== ingredient)
            );
        }else {
            setSelectedIngredients([...selectedIngredients,ingredient]);
        }
     };

     const handleRemoveIngredient = (ingredient) => {
        setSelectedIngredients(
          selectedIngredients.filter((item) => item !== ingredient)
        );
      };


     const handleAddToFridge = () =>{
        console.log("추가된 재료", selectedIngredients);
     }

     const filteredIngredients = searchTerm
        ? IngredientData.filter((ingredient)=>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : IngredientData;

        return (
            <PageContainer>
              <Header />
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="재료명을 검색해보세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon>🔍</SearchIcon>
              </SearchContainer>
              <IngredientsGrid>
                {filteredIngredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient.id}
                    selected={selectedIngredients.includes(ingredient.name)}
                    onClick={() => toggleIngredient(ingredient.name)}
                  >
                    <IngredientImage src={ingredient.img} alt={ingredient.name} />
                    <IngredientName>{ingredient.name}</IngredientName>
                  </IngredientCard>
                ))}
              </IngredientsGrid>
              {selectedIngredients.length > 0 && (
                    <SelectedIngredientsContainer>
                    {selectedIngredients.map((ingredient) => (
                        <IngredientPill
                        key={ingredient}
                        onClick={() => handleRemoveIngredient(ingredient)}
                        >
                        {ingredient} ✕
                        </IngredientPill>
                    ))}
                    </SelectedIngredientsContainer>
                )}
              <AddButton
                onClick={handleAddToFridge}
                disabled={selectedIngredients.length === 0}
              >
                {selectedIngredients.length === 0
                  ? "재료를 선택해보세요"
                  : `재료 추가하기 ${selectedIngredients.length}개`}
              </AddButton>
            </PageContainer>
          );
    
}

export default AddIngredient;

const PageContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
`;



const SearchContainer = styled.div`
display: flex;
align-items: center;
margin: 10px 0;
width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 14px;
`;

const SearchIcon = styled.div`
  color: white;
  padding: 10px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;


const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const IngredientCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#ffe0e0" : "#ffffff")};
  border: ${(props) => (props.selected ? "1px solid #ff6b6b" : "1px solid #ddd")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, border 0.2s;
`;

const IngredientImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const IngredientName = styled.p`
  font-size: 10px;
  color: #333;
`;

const AddButton = styled.button`
  margin-top: 20px;
  padding: 15px 20px;
  width: 90%;
  background-color: ${(props) => (props.disabled ? "#FCA5A5" : "#ff6b6b")};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#FCA5A5" : "#ff5252")};
  }
`;


const SelectedIngredientsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const IngredientPill = styled.div`
  padding: 5px 10px;
  background-color: #FEE8EF;
  border:1px solid #ff5252;
  color: #333;
  border-radius: 15px;
  font-size: 10px;

`;