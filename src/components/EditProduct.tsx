/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

import { Product } from "../types/products";
import Loader from "./Loader";
import { productsApi } from "../redux/api/productsApi";
const { Option } = Select;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = productsApi.useGetProductByIdQuery(Number(id));
  console.log(product);
  const { data: categories } = productsApi.useGetCategoriesQuery();

  const arafatjion = categories?.map((item) => console.log(item));

  const categoryOptions = categories?.map((item: any) => (
    <Option key={item.name} value={item.name}>
      {item.name}
    </Option>
  ));
  console.log(arafatjion);
  const [updateProduct] = productsApi.useUpdateProductMutation();

  const [form] = Form.useForm();

  const handleUpdate = async (values: Partial<Product>) => {
    await updateProduct({ id: Number(id), ...values });
    console.log(values);
  };
  if (isLoading) return <Loader></Loader>;
  if (error) return <div>Error loading product details</div>;
  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", font: "5px" }}>Edit Products</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={product}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a category" style={{ width: "100%" }}>
                {categoryOptions}
              </Select>
            </Form.Item>
            <Form.Item
              name="discountPercentage"
              label="DiscountPercentage"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div style={{ width: "100%" }}>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="weight"
              label="Weight"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="warrantyInformation"
              label="WarrantyInformation"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingInformation"
              label="ShippingInformation"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="returnPolicy"
              label="ReturnPolicy"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="minimumOrderQuantity"
              label="MinimumOrderQuantity"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    rules={[
                      { required: true, message: "Missing review comment" },
                    ]}
                  >
                    <Input placeholder="Review Comment" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[
                      { required: true, message: "Missing review rating" },
                    ]}
                  >
                    <Input placeholder="Review Rating" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(name)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Form.Item style={{ width: "400px" }}>
                <Button type="dashed" onClick={() => add()} block>
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" block htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
