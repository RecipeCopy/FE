const API_BASE_URL = "http://localhost:8080";

const fetchRecipes = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token"); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; 

    const response = await axios.get("http://localhost:8080/api/recipes", { headers }); 
    console.log("레시피 데이터:", response.data);
    setRecipes(response.data);
  } catch (err) {
    console.error("레시피 불러오기 실패!", err);
    setError(err.response ? err.response.data : "서버 오류");
  } finally {
    setLoading(false);
  }
};


