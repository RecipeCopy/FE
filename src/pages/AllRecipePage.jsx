import React, {useEffect, useState} from "react";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";
import Header from "../components/Header";
import { fetchRecipes } from "../../api";

const AllRecipePage = ({ favoriteRecipes, onToggleFavorite })=>{

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllRecipes= async () => {
          try {
            const data = await fetchRecipes();
            setRecipes(data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllRecipes();
      }, []);

      
      if (loading) return <Message>로딩 중입니다...</Message>;
      if (error) return <Message>데이터를 불러오지 못했습니다.</Message>;
    
      return (
        <PageContainer>
          <Header />
          <RecipeList
            recipes={recipes}
            favoriteRecipes={favoriteRecipes}
            onToggleFavorite={onToggleFavorite}
          />
        </PageContainer>
    );
};

export default AllRecipePage;

const PageContainer = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Message = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 50px;
`;