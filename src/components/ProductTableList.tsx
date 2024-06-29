/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Table } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import type { TableProps } from "antd";
import { Product } from "../types/products";
import { useState } from "react";
import { useGetAllProductsQuery } from "../redux/api/productsApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const ProductTableList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error } = useGetAllProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const columns: TableProps<Product>["columns"] = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/products/${record?.id}`}>
          <Button>View Details</Button>
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/products/edit/${record?.id}`}>
          <Button>Edit Product</Button>
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
    <div>
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
