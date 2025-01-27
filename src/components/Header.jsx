import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FiX} from "react-icons/fi";


const Header = ({onAddClick}) => {
    const location = useLocation();
    const navigate = useNavigate();

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
                {icon:<FiX />, action : ()=> navigate(-1)}],
                layout: "center",
            
        },
        "/recommned":{
            title:"냉장고 파먹기",
            buttons:[{
                icon:<FiX />,action : () => navigate(-1)}],
                layout: "center",
        },
        "/fridge":{
          title : "나의 냉장고",
          buttons:[
            {label : "편집하기"},
            {label:"설정"},
          ],
          layout:"space-between",
          
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
          {currentConfig.layout === "center" && currentConfig.buttons.length > 0 && (
              <BackButton onClick={currentConfig.buttons[0].action}>
                  {currentConfig.buttons[0].icon}
              </BackButton>
          )}
          <Title layout={currentConfig.layout}>{currentConfig.title}</Title>
          {currentConfig.layout !== "center" && (
              <ButtonGroup>
                  {currentConfig.buttons.map((button, index) =>
                      button.path ? (
                          <Button key={index}>
                              <StyledLink to={button.path}>{button.label}</StyledLink>
                          </Button>
                      ) : (
                          <Button key={index} onClick={button.action}>
                              {button.icon || button.label}
                          </Button>
                      )
                  )}
              </ButtonGroup>
          )}
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

const BackButton = styled.button`
  position: absolute;
  left: 50px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #717171;
  }
`;
