import { Col, Row } from "antd";
import React, { useState } from "react";
import { Image } from "antd";
import { useLocation } from "react-router-dom";

const DetailPage = React.memo(function DetailPage() {
  const location = useLocation();
  const { Name, Description, NetPrice, Qty, DiscountPercent, images } =
    location.state; // Access the passed data
  const [image, setImage] = useState(images[0]);
  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: 20 }}>
      <Row>
        <Col span={12}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: 80 }}>
              {images.map((imageName) => {
                return (
                  <img
                    onClick={() => setImage(imageName)}
                    style={{ width: 80 }}
                    key={imageName}
                    src={`https://piseth.site/api/get-image/${imageName}`}
                  />
                );
              })}
            </div>
            <div style={{ width: "80%" }}>
              <Image
                style={{ objectFit: "contain" }}
                src={`https://piseth.site/api/get-image/${image}`}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <p style={{ fontSize: 20 }}>Product: {Name}</p>
          <p style={{ color: "red" }}>Price {NetPrice}$</p>
          <p style={{ textDecoration: "line-through", color: "blue" }}>
            Discount: {DiscountPercent}%
          </p>
          <p>Qty: {Qty}</p>
          <p>Description: {Description}</p>
        </Col>
      </Row>
    </div>
  );
});

export default DetailPage;
