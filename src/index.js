import React from "react";
import AuthContextProvider from "./context/auth-context";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import App from "./App";
import Counter from "./components/Counter";
import Ingredients from './components/Ingredients/Ingredients';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/todos",
        element: <Ingredients/>
    }
])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
    {/* // <App /> */}
    {/* // <Counter/> */}
   </AuthContextProvider>
);
