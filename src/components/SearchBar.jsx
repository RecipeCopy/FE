import React from "react";
import styled from "styled-components";

const SearchBar = ({searchTerm,setSearchTerm}) =>{
    const handleInputChange = (e) =>{
        setSearchTerm(e.target.value);
    };

return (
    <SearchContainer>
        <SearchInput
            type ="text"
            placeholder="재료명을 검색해보세요"
            value={searchTerm}
            onChange = {handleInputChange} 
        />
        <SearchIcon>🔍</SearchIcon>
        
    </SearchContainer>
    )
}

export default SearchBar;

const SearchContainer = styled.div`
position: relative;
width: 100%;
margin: 20px 0;
`;

const SearchInput = styled.input`
width: 100%;
padding: 10px 40px 10px 15px;
font-size: 16px;
border: 1px solid #ddd;
border-radius: 10px;
outline: none;
background-color: #f8f8f8;
`;

const SearchIcon = styled.span`
position: absolute;
right: 10px;
top: 50%;
transform: translateY(-50%);
font-size: 18px;
color: #888;
`;