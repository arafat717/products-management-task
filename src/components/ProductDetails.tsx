import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Button, Carousel, List, Rate } from "antd";
import "./ProductDetail.css";
import { useGetProductByIdQuery } from "../redux/api/productsApi";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductByIdQuery(Number(id));
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    <div className="product-detail">
      {data?.images && data.images.length > 0 && (
        <div className="carousel-container">
          <Carousel autoplay>
            {data.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <Descriptions
        title="Product Details"
        bordered
        className="product-descriptions"
      >
        <Descriptions.Item label="Title">{data?.title}</Descriptions.Item>
        <Descriptions.Item label="Price">${data?.price}</Descriptions.Item>
        <Descriptions.Item label="Category">{data?.category}</Descriptions.Item>
        <Descriptions.Item label="Stock">{data?.stock}</Descriptions.Item>
        <Descriptions.Item label="Brand">{data?.brand}</Descriptions.Item>
        <Descriptions.Item label="SKU">{data?.sku}</Descriptions.Item>
        <Descriptions.Item label="Weight">{data?.weight} kg</Descriptions.Item>
        <Descriptions.Item label="Dimensions">
          {data &&
            `${data.dimensions.width} x ${data.dimensions.height} x ${data.dimensions.depth} cm`}
        </Descriptions.Item>
        <Descriptions.Item label="Warranty Information">
          {data?.warrantyInformation}
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Information">
          {data?.shippingInformation}
        </Descriptions.Item>
        <Descriptions.Item label="Availability Status">
          {data?.availabilityStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Return Policy">
          {data?.returnPolicy}
        </Descriptions.Item>
        <Descriptions.Item label="Minimum Order Quantity">
          {data?.minimumOrderQuantity}
        </Descriptions.Item>
        <Descriptions.Item label="Rating">
          {data?.rating && <Rate disabled defaultValue={data.rating} />}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {data?.description}
        </Descriptions.Item>
      </Descriptions>

      {data?.reviews && data.reviews.length > 0 && (
        <div className="reviews-section">
          <h3>Reviews</h3>
          <List
            itemLayout="horizontal"
            dataSource={data.reviews}
            renderItem={(review) => (
              <List.Item>
                <List.Item.Meta
                  title={`${review.reviewerName} (${review.rating} stars)`}
                  description={review.comment}
                />
              </List.Item>
            )}
          />
        </div>
      )}

      <Button
        type="primary"
        className="edit-button"
        onClick={() => navigate(`/products/${id}/edit`)}
      >
        Edit Product
      </Button>
    </div>
  );
};

export default ProductDetail;
