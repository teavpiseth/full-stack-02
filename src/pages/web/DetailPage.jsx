import { Col, Row } from "antd";
import React from "react";
import { Image } from "antd";
import Image1 from "../../assets/images/category/car.jpg";

const DetailPage = React.memo(function DetailPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: 20 }}>
      <Row>
        <Col span={12}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: 80 }}>
              <img style={{ width: 80 }} key={Image1} src={Image1} />
            </div>
            <div style={{ width: "80%" }}>
              <Image style={{ objectFit: "contain" }} src={Image1} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <p style={{ fontSize: 20 }}>Product: {"Car"}</p>
          <p style={{ color: "red" }}>Price {10}$</p>
          <p style={{ textDecoration: "line-through", color: "blue" }}>
            Discount: {20}%
          </p>
          <p>Qty: {10}</p>
          <p>Description: {"red"}</p>
        </Col>
      </Row>
    </div>
  );
});

export default DetailPage;
