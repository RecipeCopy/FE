import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout.jsx";
import NotFound from "./pages/not-found.jsx";
import MainPage from "./pages/Main.jsx";
import StartPage from "./pages/Start.jsx";
import AddIngredient from "./pages/AddIngredient.jsx";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
