import { Card, Col, Row } from "antd";
import React from "react";
import Meta from "antd/es/card/Meta";
import Image1 from "../../assets/images/category/car.jpg";
import { Link } from "react-router-dom";

const Product = React.memo(function Product() {
  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h2 style={{ fontWeight: 400, margin: "0px 0" }}>Product</h2>
      <Row>
        <Link to={"/web/product-detail"}>
          <Col span={6} style={{ textAlign: "center", marginBottom: 15 }}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              onClick={() => {}}
              cover={
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: 100,
                    objectFit: "contain",
                    marginTop: 15,
                  }}
                  src={Image1}
                />
              }
            >
              <Meta
                title={"Car"}
                style={{
                  marginBottom: 25,
                }}
              />

              <span
                style={{
                  color: "blue",
                  display: "block",
                  border: "1px solid",
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                20$ Off
              </span>

              <div
                style={{
                  color: "#f34770",
                  textAlign: "left",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span> 1000 $</span>

                <span
                  style={{
                    color: "black",
                    marginLeft: 30,
                    textDecoration: "line-through",
                  }}
                >
                  price $
                </span>
              </div>
              <span
                style={{
                  textAlign: "left",
                  width: "100%",
                  display: "block",
                }}
              >
                Description
              </span>
            </Card>
          </Col>
        </Link>
        <Link to={"/web/product-detail"}>
          <Col span={6} style={{ textAlign: "center", marginBottom: 15 }}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              onClick={() => {}}
              cover={
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: 100,
                    objectFit: "contain",
                    marginTop: 15,
                  }}
                  src={Image1}
                />
              }
            >
              <Meta
                title={"Car"}
                style={{
                  marginBottom: 25,
                }}
              />

              <span
                style={{
                  color: "blue",
                  display: "block",
                  border: "1px solid",
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                20$ Off
              </span>

              <div
                style={{
                  color: "#f34770",
                  textAlign: "left",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span> 1000 $</span>

                <span
                  style={{
                    color: "black",
                    marginLeft: 30,
                    textDecoration: "line-through",
                  }}
                >
                  price $
                </span>
              </div>
              <span
                style={{
                  textAlign: "left",
                  width: "100%",
                  display: "block",
                }}
              >
                Description
              </span>
            </Card>
          </Col>
        </Link>
      </Row>
    </div>
  );
});

export default Product;
