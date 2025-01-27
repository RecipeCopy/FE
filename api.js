import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/swagger-ui/index.html";

export async function fetchRecipes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/recipes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  }