/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Table } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import type { TableProps } from "antd";
import { Product } from "../types/products";
import { useState } from "react";
import { useGetAllProductsQuery } from "../redux/api/productsApi";
import { useNavigate } from "react-router-dom";

const ProductTableList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useGetAllProductsQuery({
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
        <Button type="link" onClick={() => navigate(`/products/${record?.id}`)}>
          View Details
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/products/${record?.id}/edit`)}
        >
          Edit Product
        </Button>
      ),
    },
  ];

  const handlePagination = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  console.log(data?.products);
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
