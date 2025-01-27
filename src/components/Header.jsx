import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = ({onAddClick}) => {
    const location = useLocation();

    console.log("Current Path:", location.pathname);
   
    const headerConfig = {
        "/main":{
            title:"나의 냉장고",
            buttons : [
                {label:"추가하기",action: onAddClick},
                {label:"로그인",path:"/login"},
            ],
            layout:"space-between",
        },
        "/add" : {
            title:"재료 추가하기",
            buttons : [
                {label:"뒤로가기",path:"/main"}],
                layout: "center",
            
        },
        "/recommned":{
            title:"냉장고 파먹기",
            buttons:[{
                label:"뒤로가기",path:"/main"}],
                layout: "center",
        },
        default :{
            title:"냉장고 레시피",
            buttons : [],
            layout:"space-between",
        }

    };

    const currentConfig = headerConfig[location.pathname] || headerConfig.default;

    return (
      <HeaderContainer layout={currentConfig.layout}>
        <Title>{currentConfig.title}</Title>
        <ButtonGroup>
          {currentConfig.buttons.map((button, index) =>
            button.action ? ( // 버튼에 action이 있으면 onClick 연결
              <Button key={index} onClick={button.action}>
                {button.label}
              </Button>
            ) : (
              <Button key={index}>
                <StyledLink to={button.path}>{button.label}</StyledLink>
              </Button>
            )
          )}
        </ButtonGroup>
      </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: ${(props) =>
    props.layout === "center" ? "center" : "space-between"};
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  text-align: ${(props) => (props.layout === "center" ? "center" : "left")};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
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