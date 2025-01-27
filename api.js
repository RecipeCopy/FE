const API_BASE_URL =  "http://localhost:8080";

export const fetchRecipes = async ()=>  {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return await response.json(); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error; 
    }
  };