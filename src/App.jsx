import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";

import RootLayout from "./layout/root-layout.jsx";
import NotFound from "./pages/not-found.jsx";
import MainPage from "./pages/Main.jsx";
import StartPage from "./pages/Start.jsx";
import AddIngredient from "./pages/AddIngredient.jsx";
import SignUp from "./pages/Signup.jsx";
import AllRecipePage from "./pages/AllRecipePage.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";
import MyFridge from "./pages/MyFridge.jsx";

function App() {
  const [ingredients, setIngredients] = useState([]); 

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
            ingredients.length===0? (
            <MainPage 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            />
            ) : (
            <MyFridge
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            )
          ), 
        },
        {
          path: "fridge",
          element: (
            <MyFridge
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
          element: <SignUp />,
        },
        {
          path: "all-recipes",
          element: <AllRecipePage />,
        },
        {
          path: "favorites",
          element: <FavoritePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
