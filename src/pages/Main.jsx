import React from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import styled from "styled-components";

const Main = () => {
    return (
        <>
            <MainContainer>
                <Header />
                <TabBar />
            </MainContainer>
        </>
    );
  };
  
export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`;

const StyledHeader = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;