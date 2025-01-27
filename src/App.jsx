import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout.jsx";
import NotFound from "./pages/not-found.jsx";
import MainPage from "./pages/Main.jsx";
import StartPage from "./pages/Start.jsx";
import AddIngredient from "./pages/AddIngredient.jsx";
import SignUp from "./pages/Signup.jsx";
import AllRecipePage from "./pages/AllRecipePage.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";


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
        element: <MainPage />,
      },
      {
        path : "add",
        element: <AddIngredient />,
      },
      {path : "login",
        element:<SignUp/>,
      },{
        path:"all-recipes",
        element:<AllRecipePage />,
      },{
        path:"favorites",
        element:<FavoritePage/>
      },

    ],
  },
]);

function App() {

  return <RouterProvider router={router} />
  
  ;
}

export default App;
