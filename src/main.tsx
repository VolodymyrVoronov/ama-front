import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { Path } from "./constants/index.ts";

import App from "./App.tsx";

import "@fontsource/roboto";

const router = createBrowserRouter([
  {
    path: Path.HOME,
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: Path.QUESTIONS,
        element: <div>Questions</div>,
      },
      {
        path: Path.QUESTION,
        element: <div>Question</div>,
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

