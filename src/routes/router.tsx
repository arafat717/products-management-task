import { createBrowserRouter } from "react-router-dom";
import ProductTableList from "../components/ProductTableList";
import ProductDetails from "../components/ProductDetails";
import MainLayout from "../components/MainLayout/MainLayout";
import EditProduct from "../components/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <ProductTableList></ProductTableList>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/products/edit/:id",
        element: <EditProduct></EditProduct>,
      },
    ],
  },
]);

export default router;
