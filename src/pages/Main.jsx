import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import API from "../api/api";
import axios from "axios"; 
import Ingredients from "../components/Ingredients";


const API_BASE_URL = "http://localhost:8080";


const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nickName, setNickName] = useState("사용자"); // 닉네임 기본값 설정
  const [fridgeIngredients, setFridgeIngredients] = useState([]); //냉장고 재료 상태

  const navigate = useNavigate();
  const location = useLocation(); 

  //카카오 로그인(나중에 혹시 연결할수도 있으니까 지우지말아주세여 ㅎㅎㅎ)
  // // URL 파라미터 또는 sessionStorage에서 닉네임 가져오기
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const urlNickName = params.get("nickName");

  //   if (urlNickName) {
  //     setNickName(urlNickName);
  //     sessionStorage.setItem("nickName", urlNickName); // 닉네임 저장
  //   } else {
  //     const storedNickName = sessionStorage.getItem("nickName");
  //     if (storedNickName) {
  //       setNickName(storedNickName);
  //     }
  //   }
  // }, []);


  const getIngredientImage = (ingredientName) => {
    const found = Ingredients.find((item) => item.name === ingredientName);
    return found ? found.img : "/기본재료이미지.png"; // 이미지가 없으면 기본 이미지 반환
  };
  
  

    //로그인된 사용자 정보 가져오기
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await API.get("/user"); //사용자 정보 가져오기
          const { nickName } = response.data;
          setNickName(nickName); 
          localStorage.setItem("nickName", nickName); //localStorage에 저장
        } catch (error) {
          console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        }
      };
  
      const storedNickName = localStorage.getItem("nickName");
      if (storedNickName) {
        setNickName(storedNickName);
      } else {
        fetchUserInfo();
      }
    }, []);
 

  // 나의 냉장고 데이터 가져오기 
  const fetchFridgeIngredients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }
  
      const response = await axios.get(`${API_BASE_URL}/api/fridge`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("냉장고에서 불러온 재료:", response.data);
  
      //API 데이터에 이미지 추가
      const updatedData = response.data.map((item) => ({
        ...item,
        imageUrl: getIngredientImage(item.ingredientName),
      }));
  
      setFridgeIngredients(updatedData);
    } catch (error) {
      console.error("냉장고 데이터 불러오기 실패:", error);
      if (error.response && error.response.status === 403) {
        alert("접근 권한이 없습니다. 다시 로그인 해주세요.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };
  
  // 페이지 진입 시 냉장고 재료 로딩
  useEffect(() => {
    fetchFridgeIngredients();
  }, [location]);

  const handleAddIngredient = () => {
    navigate("/add");
  };


// 날짜 변환 함수 
const formatDate = (dateString) => {
  if(!dateString) return "날짜 없음";

  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (`0${date.getMonth()+1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);

  return `${year}.${month}.${day} 추가`;
};

// 카메라  
const handleTakePhoto = () => {
  console.log("카메라 연결 실행");
};


  return (
    <>
      <Header onAddClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <MenuContainer>
          <MenuButton onClick={handleAddIngredient}>
            ➕ 재료 추가하기
          </MenuButton>
          <MenuButton onClick={handleTakePhoto}>
            ➕ 재료 사진찍기
          </MenuButton>
        </MenuContainer>
      )}
      <Content>
        {fridgeIngredients.length === 0 ? (
          <EmptyFridgeWrapper>
            <img src="/비어있는냉장고.png" alt="빈 냉장고" />
            <p>{nickName}님의 냉장고가 비었어요!</p>
            <p>새로운 재료를 추가해보세요.</p>
          </EmptyFridgeWrapper>
        ) : (
          <FridgeGrid>
            {fridgeIngredients.map((item, index) => (
              <IngredientCard key={index}>
                <IngredientImage
                  src={item.imageUrl ? item.imageUrl : "/기본재료이미지.png"}
                  alt={item.ingredientName}
                />
                <IngredientInfo>
                  <IngredientName>{item.ingredientName}</IngredientName>
                  <AddedDate>{formatDate(item.addedDate)}</AddedDate>
                </IngredientInfo>
              </IngredientCard>
            ))}
          </FridgeGrid>
        )}
      </Content>
      <TabBar />
    </>
  );
};

export default Main;

const EmptyFridgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  
  img {
    width: 150px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #777;
    margin: 5px 0;
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const MenuButton = styled.button`
  background-color: #fff;
  color: black;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;

const Content = styled.div`
  margin-top: 20px;
`;

const FridgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
`;


const IngredientCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "layout",
})`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;


const IngredientImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
`;


const IngredientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;


const IngredientName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;


const AddedDate = styled.span`
  font-size: 12px;
  color: gray;
`;