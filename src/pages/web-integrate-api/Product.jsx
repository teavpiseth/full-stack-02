import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

const Product = React.memo(function Product() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://piseth.site/api/web/product/get-list?pageSize=10&page=1")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h2 style={{ fontWeight: 400, margin: "0px 0" }}>Product</h2>
      <Row gutter={[16, 16]}>
        {product?.map((obj) => {
          return (
            <Col
              key={obj.Id}
              span={6}
              style={{ textAlign: "center", marginBottom: 15 }}
            >
              <Link to="/web/product-detail" state={obj}>
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
                      src={`https://piseth.site/api/get-image/${obj?.images?.[0]}`}
                    />
                  }
                >
                  <Meta
                    title={obj.Name}
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
                    {obj.DiscountPercent}% Off
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
                    <span> {obj.NetPrice} $</span>

                    <span
                      style={{
                        color: "black",
                        marginLeft: 30,
                        textDecoration: "line-through",
                      }}
                    >
                      price {obj.DiscountAmount}$
                    </span>
                  </div>
                  <span
                    style={{
                      textAlign: "left",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    {obj.Description}
                  </span>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

export default Product;
