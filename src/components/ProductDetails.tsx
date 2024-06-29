import { useParams } from "react-router-dom";
import { Descriptions, Carousel, List, Rate } from "antd";
import "./ProductDetail.css";
import "./ProductDetail.css";
import { productsApi } from "../redux/api/productsApi";
import Loader from "./Loader";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = productsApi.useGetProductByIdQuery(
    Number(id)
  );

  if (isLoading) return <Loader></Loader>;
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
                  style={{ width: "100%", height: "600px" }}
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
    </div>
  );
};

export default ProductDetail;
