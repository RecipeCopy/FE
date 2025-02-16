import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const RecipeRecommendationButton = ({fridgeIngredients}) =>{
    const navigate = useNavigate();

    const handleRecommendClick =()=>{
        if(fridgeIngredients.length===0){
            alert("냉장고에 재료가 없습니다. 먼저 재료를 추가하세요!");
            return;
        }

        navigate("/recommend", {state : { Ingredients:fridgeIngredients}});

    };


    return ( 
        <ButtonContainer>
                  <RecommendButton onClick={handleRecommendClick}>냉장고 파먹기</RecommendButton>

        </ButtonContainer>
    )

}


export default RecipeRecommendationButton;

const ButtonContainer= styled.div`
    display :flex;
    justify-content: center;
    margin-top:20px;
`;

const RecommendButton = styled.button`
    background-color :#ff0017;
    color: white;
    position: fixed;
    bottom : 80px;
    font-size : 16px;
    font-weight: bold;
    padding : 15px;
    border-radius : 10px;
    border :none;
    cursor: pointer;
    width : 90%;
    transition : background-color 0.2s;

    &:hover {
        background-color : #ff6b6b;
    }
`;