import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FiX} from "react-icons/fi";


const Header = ({ onAddClick }) => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // 사용자 이름 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const handleKakaoLogin = async () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoLoginUrl; // 카카오 인증 URL로 리다이렉트
  };

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
  
      if (code) {
        try {
          const response = await axios.get(`${API_BASE_URL}/callback?code=${code}`);
          const { token, userId } = response.data;
  
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
  
          navigate("/main");
        } catch (error) {
          console.error("로그인 중 오류 발생:", error);
          alert("로그인에 실패했습니다.");
        }
      }
    };
  
    fetchToken();
  }, []);

  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "GET",
          credentials: "include", // 세션 정보를 포함
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.nickName);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include", // 세션 정보를 포함
      });

      if (response.ok) {
        // 스토리지 데이터 삭제
        sessionStorage.clear(); // sessionStorage에 저장된 모든 항목 삭제
        localStorage.removeItem("userName"); // 로컬스토리지 삭제

        setIsLoggedIn(false);
        setUserName("");
        window.location.href = "/"; // 로그인 페이지로 리다이렉트
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const headerConfig = {
    "/main": {
      title: "나의 냉장고",
      buttons: [
        { label: "추가하기", action: onAddClick },
        { label: isLoggedIn ? "로그아웃" : "로그인", action: isLoggedIn ? handleLogout : handleKakaoLogin },
      ],
      layout: "space-between",
    },
    "/add": {
      title: "재료 추가하기",
      buttons: [{ icon: <FiX />, action: () => navigate(-1) }],
      layout: "center",
    },
    "/recommned": {
      title: "냉장고 파먹기",
      buttons: [{ icon: <FiX />, action: () => navigate(-1) }],
      layout: "center",
    },
    "/fridge": {
      title: "나의 냉장고",
      buttons: [{ label: "편집하기" }, { label: "설정" }],
      layout: "space-between",
    },
    "/favorites": {
      title:"즐겨찾기",
      buttons:[
        {label:"의견보내기",path:"/feedback"}],
        layout:"space-between",
    },  
    default: {
      title: "냉장고 레시피",
      buttons: [],
      layout: "space-between",
    },
    
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
