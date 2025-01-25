import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout.jsx";
import NotFound from "./pages/not-found.jsx";
import MainPage from "./pages/Main.jsx";
import SignupPage from "./pages/Signup.jsx";
import StartPage from "./pages/Start.jsx";

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
        path: "login",
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
