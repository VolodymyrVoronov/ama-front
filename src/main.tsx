import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { Path } from "./constants/index.ts";

import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import SuspenseWrapper from "./components/SuspenseWrapper/SuspenseWrapper.tsx";

const Questions = lazy(() => import("./pages/Questions/Questions.tsx"));
const Auth = lazy(() => import("./pages/Auth/Auth.tsx"));
const Admin = lazy(() => import("./pages/Admin/Admin.tsx"));

import "@fontsource-variable/comfortaa";

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
        element: (
          <SuspenseWrapper>
            <Questions />
          </SuspenseWrapper>
        ),
      },
      {
        path: Path.AUTH,
        element: (
          <SuspenseWrapper>
            <Auth />
          </SuspenseWrapper>
        ),
      },
      {
        path: Path.ADMIN,
        element: (
          <SuspenseWrapper>
            <Admin />
          </SuspenseWrapper>
        ),
      },
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

