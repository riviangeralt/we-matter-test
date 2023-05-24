import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { AddProduct, ProductView, ProductsList, UsersList } from "./pages";
import { Layout } from "./components";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/products",
      element: <ProductsList />,
      index: true,
    },
    {
      path: "/product/:productId",
      element: <ProductView />,
    },
    {
      path: "/users",
      element: <UsersList />,
    },
  ]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductsList />} index />
        <Route path="/product/:productId" element={<ProductView />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<AddProduct />} />
      </Routes>
    </Layout>
  );
};

export default App;
