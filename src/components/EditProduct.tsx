import React from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/api/productsApi";
import { Product } from "../types/products";

const { Option } = Select;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductByIdQuery(Number(id));
  console.log(product);
  const { data: categories } = useGetCategoriesQuery();

  const categoryOptions = categories?.map((item) => (
    <Option key={item.name} value={item.name}>
      {item.name}
    </Option>
  ));
  const [updateProduct] = useUpdateProductMutation();

  const [form] = Form.useForm();

  const onFinish = async (values: Partial<Product>) => {
    await updateProduct({ id: Number(id), ...values });
    console.log(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={product}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select placeholder="Select a category" style={{ width: "100%" }}>
          {categoryOptions}
        </Select>
      </Form.Item>
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
                  rules={[{ required: true, message: "Missing review rating" }]}
                >
                  <Input placeholder="Review Rating" />
                </Form.Item>
                <Button type="link" onClick={() => remove(name)}>
                  Remove
                </Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
