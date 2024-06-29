/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Table } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import type { TableProps } from "antd";
import { Product } from "../types/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { productsApi } from "../redux/api/productsApi";

const ProductTableList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error } = productsApi.useGetAllProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/products/${record?.id}`}>
          <Button type="dashed">View Details</Button>
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/products/edit/${record?.id}`}>
          <Button type="dashed">Edit Product</Button>
        </Link>
      ),
    },
  ];

  const handlePagination = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };
  if (isLoading) return <Loader></Loader>;
  if (error) return <div>Error loading product details</div>;
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>total Product: {data?.products?.length}</h1>
      <Table
        columns={columns}
        dataSource={data?.products}
        pagination={{
          current: currentPage,
          pageSize,
          total: data?.total,
        }}
        onChange={handlePagination}
      />
    </div>
  );
};

export default ProductTableList;
