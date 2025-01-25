import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        <StyledLink to="/main">나의 냉장고</StyledLink>
      </Title>
      <ButtonGroup>
        <Button>
          <StyledLink to="/add">추가하기</StyledLink>
        </Button>
        <Button>
          <StyledLink to="/login">로그인</StyledLink>
        </Button>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
`;

const Button = styled.div`
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #717171;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #717171;
  }
`;