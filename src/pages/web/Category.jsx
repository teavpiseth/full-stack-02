import { Card, Col, Menu, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import Image1 from "../../assets/images/category/car.jpg";
const _items = [
  {
    key: "sub1",
    label: "Apple",
  },
  {
    key: "2",
    label: "Nokai",
  },
];

const CategoryPage = React.memo(function CategoryPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Menu
            onClick={() => {}}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={_items}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Row>
            <Col span={8} style={{ textAlign: "center", marginBottom: 15 }}>
              <Card
                hoverable
                style={{
                  width: "100%",
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
                  title="test"
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
                  10$ Off
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
                  <span> 10 $</span>

                  <span
                    style={{
                      color: "black",
                      marginLeft: 30,
                      textDecoration: "line-through",
                    }}
                  >
                    20 $
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
            <Col span={8} style={{ textAlign: "center", marginBottom: 15 }}>
              <Card
                hoverable
                style={{
                  width: "100%",
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
                  title="test"
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
                  10$ Off
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
                  <span> 10 $</span>

                  <span
                    style={{
                      color: "black",
                      marginLeft: 30,
                      textDecoration: "line-through",
                    }}
                  >
                    20 $
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
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default CategoryPage;
