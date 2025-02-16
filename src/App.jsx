import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";

import RootLayout from "./layout/root-layout.jsx";
import NotFound from "./pages/not-found.jsx";
import MainPage from "./pages/Main.jsx";
import StartPage from "./pages/Start.jsx";
import AddIngredient from "./pages/AddIngredient.jsx";
import SignIn from "./pages/LoginForm.jsx";
import AllRecipePage from "./pages/AllRecipePage.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";
import RecipeRecommendation from "./pages/RecipeRecommendation.jsx";
import SignUp from "./pages/SignupForm.jsx";

function App() {
  const [ingredients, setIngredients] = useState([]); 
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <StartPage />,
        },
        {
          path: "main",
          element: (
            <MainPage 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            />
          ), 
        },
        {
          path: "add",
          element: (
            <AddIngredient
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          ), 
        },
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "all-recipes",
          element: <AllRecipePage />,
        },
        {
          path: "favorites",
          element: <FavoritePage/>,
        },
        {
          path: "recommend",
          element : <RecipeRecommendation />
        },
      
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
