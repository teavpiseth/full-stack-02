/* eslint-disable react/prop-types */
import { Card, Col, Empty, Menu, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import Image1 from "../../assets/images/category/car.jpg";
import { Link, useSearchParams } from "react-router-dom";
import { WebContext } from "../../contextProvider/webContext.jsx";
import { useContext } from "react";
import TeaSet from "../../lesson/UI/ComponentPure";
const _items = [
  {
    key: "sub1",
    label: "Apple",
  },
  {
    key: "2",
    label: "Nokai",
  },
  {
    key: "3",
    label: "SamSung",
  },
];

const CategoryPage = React.memo(function CategoryPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [category, setCategory] = useState(_items);
  const [product, setProduct] = useState([]);
  const dataContext = useContext(WebContext);
  const categoryData = dataContext.category;
  // console.log(data, "data");
  const categoryHandler = (category) => {
    const childCategory = category.filter(
      (obj) => obj.ParentsId === Number(categoryId)
    );
    const result = childCategory.map((obj) => {
      return {
        key: obj.Id,
        label: obj.Name,
      };
    });

    setCategory(result);
  };

  function fetchProduct(category, IsOnClickMenu = false) {
    let Ids = "";
    if (IsOnClickMenu === false) {
      const childCategory = category?.filter(
        (obj) => obj.ParentsId === Number(categoryId)
      );
      Ids = childCategory?.map((obj) => obj.Id)?.join(",");
    } else {
      Ids = category;
    }

    fetch(
      "https://piseth.site/api/web/product/get-list?pageSize=10&page=1&groupCategory=" +
        Ids
    )
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    // const apiUrl = "https://piseth.site/api/web/category/get-list";
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // setCategory(data.list);
    //     categoryHandler(data.list);
    //     fetchProduct(data.list);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    categoryHandler(categoryData);
    fetchProduct(categoryData);
  }, []);
  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h2 onClick={dataContext.alertAtAppComponent}>
        Test function from context
      </h2>
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Menu
            onClick={(value) => {
              fetchProduct(value.key, true);
            }}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={category}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Row>
            {product.length === 0 && (
              <Col span={24}>
                {" "}
                <Empty />
              </Col>
            )}
            {product.map((obj) => {
              return (
                <Col
                  key={obj.Id}
                  span={8}
                  style={{ textAlign: "center", marginBottom: 15 }}
                >
                  <Link to="/product-detail" state={obj}>
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
                          src={
                            "https://piseth.site/api/get-image/" +
                            obj.images?.[0]
                          }
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
                          {obj.Price} $
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
        </Col>
      </Row>
    </div>
  );
});

export default CategoryPage;
