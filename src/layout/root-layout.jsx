import React from "react";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const RootLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #e3fff2;
  }
`;

const Container = styled.div`
  width: 393px;
  min-height: 100vh;
  background-color: #FFFFFF;
  overflow-y: auto;
`;