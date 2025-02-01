import React, {useEffect, useState} from "react";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import axios from "axios";

const AllRecipePage = ()=>{

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchRecipes = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:8080/api/recipes"); 
          console.log("레시피 데이터:", response.data); 
          setRecipes(response.data);
        } catch (err) {
          console.error("레시피 불러오기 실패!", err);
          setError(err.response ? err.response.data : "서버 오류");
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecipes();
    }, []);

      
      if (loading) return <Message>로딩 중입니다...</Message>;
      if (error) return <Message>데이터를 불러오지 못했습니다.</Message>;
    
      return (
        <PageContainer>
            <Header />
            <RecipeList recipes={recipes} />
            <TabBar />
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