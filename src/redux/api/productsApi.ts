import {
  GetCategoriesResponse,
  GetProductByIdResponse,
  Product,
} from "../../types/products";
import { baseApi } from "./baseApi";

type GetProductRespose = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      GetProductRespose,
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<GetProductByIdResponse, number>({
      query: (id) => `products/${id}`,
    }),
    updateProduct: builder.mutation<
      Product,
      Partial<Product> & Pick<Product, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "products/categories",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} = productsApi;
