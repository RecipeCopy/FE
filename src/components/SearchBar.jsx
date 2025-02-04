import React from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <CenteredContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="요리하고 싶은 재료를 검색해보세요."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
      </SearchContainer>
    </CenteredContainer>
  );
};

export default SearchBar;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 400px; 
  margin:5px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 40px 12px 20px;
  font-size: 14px;
  border: none;
  border-radius: 24px;
  outline: none;
  background-color: transparent;
  color: #555;

  &::placeholder {
    color: #ccc;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 16px;
  font-size: 18px;
  color: #bbb;
`;
