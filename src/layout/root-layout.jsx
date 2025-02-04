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
    background-color: #e3fff2;
  }
`;

const Container = styled.div`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 393px;
  min-height: 100vh;
  background-color: #FFFFFF;
  overflow-y: auto;
`;