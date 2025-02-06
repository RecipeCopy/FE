import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CameraModal from "../components/CameraModal.jsx";

const API_BASE_URL = "http://localhost:8080";

const AddIngredient = ({ setIngredients }) => {
  const [availableIngredients, setAvailableIngredients] = useState([]); // 전체 재료 목록
  const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 재료
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
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


  useEffect(() => {
    const fetchIngredientsList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/ingredients/list`);
        setAvailableIngredients(response.data);
      } catch (error) {
        console.error("고정 재료 목록 불러오기 실패:", error);
        alert("재료 목록을 불러오지 못했습니다.");
      }
    };

    fetchIngredientsList();
  }, []);

 
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
  };


  const handleAddToFridge = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("사용자 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
      return;
    }

    if (selectedIngredients.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
        navigate("/");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // API에 보내야 할 데이터 형식으로 변환
      const ingredientsPayload = selectedIngredients.map((ingredient) => ({
        name: ingredient, 
      }));

      const response = await axios.post(
        `${API_BASE_URL}/api/fridge/add`,
        { userId, ingredients: ingredientsPayload },
        { headers }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("재료 추가 성공!", response.data);

        
        const updatedFridge = await axios.get(`${API_BASE_URL}/api/fridge/${userId}`, {
          headers,
        });
        setIngredients(updatedFridge.data); // MyFridge.jsx에 전달

        navigate("/fridge"); // 성공하면 나의 냉장고 페이지로 이동
      } else {
        throw new Error("서버 응답 실패");
      }
    } catch (error) {
      console.error("냉장고 재료 추가 실패:", error);
      alert("재료 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };


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
        {filteredIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            selected={selectedIngredients.includes(ingredient.name)}
            onClick={() => toggleIngredient(ingredient.name)}
          >
            <IngredientImage src={ingredient.img} alt={ingredient.name} />
            <IngredientName>{ingredient.name}</IngredientName>
          </IngredientCard>
        ))}
      </IngredientsGrid>

      

      {selectedIngredients.length > 0 && (
        <SelectedIngredientsContainer>
          {selectedIngredients.map((ingredient) => (
            <IngredientPill key={ingredient} onClick={() => handleRemoveIngredient(ingredient)}>
              {ingredient} ✕
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
