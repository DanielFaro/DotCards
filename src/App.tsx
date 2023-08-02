import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import "./variables.css";
const router = createBrowserRouter([
  { path: "/products", element: <Products /> },
  {
    path: "/product/:id",
    element: <Product />,
  },
  { path: "cart", element: <Cart /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
