import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IngredientCard from "../components/IngredientCard.jsx";



const API_BASE_URL = "http://localhost:8080";

const AddIngredient = ({ setIngredients }) => {
  const [availableIngredients, setAvailableIngredients] = useState([]); // 전체 재료 목록
  const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 재료
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  
  const navigate = useNavigate();

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
          navigate("/");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          localStorage.setItem("userId", response.data.userId);
          setUserId(response.data.userId);
        }
      } catch (err) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", err);
        alert("로그인이 필요합니다!");
        navigate("/");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // 냉 장고 데이터 불러오는 함수
  const fetchFridgeIngredients = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/fridge`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("냉장고에서 불러온 재료:", response.data);

      
      setIngredients(response.data.map(item => item.ingredientName));
    } catch (error) {
      console.error("냉장고 데이터 불러오기 실패:", error);
    }
  };

  // 페이지 처음 렌더링 될 때 냉장고 데이터 불러오기기 
  useEffect(() => {
    fetchFridgeIngredients();
  }, []);

  useEffect(() => {
    const fetchIngredientsList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/ingredients/list`);

        if (!Array.isArray(response.data)) {
          console.error("API 응답이 배열이 아닙니다:", response.data);
          return;
        }

        setAvailableIngredients(
          response.data.map((ingredient, index) => ({
            id: index + 1,
            name: ingredient,
            img: `/images/${ingredient}.png`,
          }))
        );
      } catch (error) {
        console.error("고정 재료 목록 불러오기 실패:", error);
        alert("재료 목록을 불러오지 못했습니다.");
      }
    };

    fetchIngredientsList();
  }, []);

  // 토글 
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.some((item) => item.id === ingredient.id)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ingredient.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // 삭제 
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item.id !== ingredient.id));
  };

  // 재료 추가 후 최신 냉장고 데이터 불러오기
  const handleAddToFridge = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  
    const payload = {
      ingredients: selectedIngredients.map((ingredient) => ingredient.name),
    };
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/fridge/add", payload, { headers });
  
      console.log("재료 추가 성공!", response.data);
  
      // 추가한 후 최신 데이터를 반영하도록 main으로 이동할 때 state 전달
      navigate("/main", { state: { refresh: true } });
  
    } catch (error) {
      console.error("재료 추가 실패:", error.response?.data || error);
      alert("재료 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  
 // 검색어로 필터링 
  const filteredIngredients = searchTerm
    ? availableIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableIngredients;

  return (
    <PageContainer>
      <Header />
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="재료명을 검색해보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <IngredientsGrid>
        {filteredIngredients.map((ingredient, index) => (
          <IngredientCard
            key={ingredient.id || index}
            ingredient={ingredient}
            selected={selectedIngredients.some((item) => item.id === ingredient.id)}
            onClick={() => toggleIngredient(ingredient)}
          />
        ))}
      </IngredientsGrid>

      {selectedIngredients.length > 0 && (
        <SelectedIngredientsContainer>
          {selectedIngredients.map((ingredient) => (
            <IngredientPill key={ingredient.id} onClick={() => handleRemoveIngredient(ingredient)}>
              {ingredient.name} ✕
            </IngredientPill>
          ))}
        </SelectedIngredientsContainer>
      )}

      <AddButton onClick={handleAddToFridge} disabled={selectedIngredients.length === 0}>
        {selectedIngredients.length === 0 ? "재료를 선택해보세요" : `재료 추가하기 ${selectedIngredients.length}개`}
      </AddButton>
    </PageContainer>
  );
};

export default AddIngredient;


const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 14px;
`;

const SearchIcon = styled.div`
  color: white;
  padding: 10px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const SelectedIngredientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 400px;
`;


const AddButton = styled.button`
  margin-top: 20px;
  padding: 15px 20px;
  width: 90%;
  background-color: ${(props) => (props.disabled ? "#FCA5A5" : "#ff6b6b")};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#FCA5A5" : "#ff5252")};
  }
`;

const IngredientPill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  margin: 5px;
  background-color: #ff6b6b;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff5252;
  }
`;
