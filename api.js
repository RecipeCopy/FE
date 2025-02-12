import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 항상 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//냉장고에 단일 재료 추가 
export const addIngredientToFridge = async (userId, ingredientName) => {
  try {
    const response = await api.post("/api/fridge", {
      userId,
      ingredient: ingredientName,
    });
    return response.data;
  } catch (error) {
    console.error("냉장고에 재료 추가 실패:", error);
    throw error;
  }
};

// 냉장고에 여러 재료 추가
export const addMultipleIngredientsToFridge = async (userId, ingredients) => {
  try {
    const response = await api.post("/api/fridge/add", {
      userId,
      ingredients,
    });
    return response.data;
  } catch (error) {
    console.error("냉장고에 여러 재료 추가 실패:", error);
    throw error;
  }
};

// 특정 사용자의 냉장고 조회
export const getUserFridge = async (userId) => {
  try {
    const response = await api.get(`/api/fridge/${userId}`);
    return response.data;
  } catch (error) {
    console.error("사용자 냉장고 조회 실패:", error);
    throw error;
  }
};

// 고정 재료 목록 조회 
export const getIngredientsList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ingredients/list`);
    console.log("API에서 받은 재료 데이터:", response.data); // ← 응답 확인

    if (!Array.isArray(response.data)) {
      console.error("API 응답이 배열이 아닙니다:", response.data);
      return [];
    }

   
    return response.data.map((ingredient) => ({
      name: ingredient,
      img: `/images/${ingredient}.png`,
    }));
  } catch (error) {
    console.error("재료 목록을 가져오는데 실패했습니다:", error);
    return [];
  }
};
//레시피 목록 조회
export const getRecipes = async () => {
  try {
    const response = await api.get("/api/recipes");
    return response.data;
  } catch (error) {
    console.error("레시피 목록 불러오기 실패:", error);
    throw error;
  }
};


export default api;
