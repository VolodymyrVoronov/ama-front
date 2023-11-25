import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { useAuthStore } from "./store/auth.ts";

import { Path } from "./constants/index.ts";

import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import Questions from "./pages/Questions/Questions.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import Auth from "./pages/Auth/Auth.tsx";

import "@fontsource-variable/comfortaa";

const { jwtToken } = useAuthStore.getState();

const router = createBrowserRouter([
  {
    path: Path.HOME,
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: Path.QUESTIONS,
        element: <Questions />,
      },
      {
        path: Path.AUTH,
        element: <Auth />,
      },
      ...(jwtToken ? [{ path: Path.ADMIN, element: <Admin /> }] : []),
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);

