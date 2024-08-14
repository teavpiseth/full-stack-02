/* eslint-disable react/prop-types */
import { Col, Row, Skeleton } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WebContext } from "../../contextProvider/webContext.jsx";
const CategoryList = React.memo(function CategoryList() {
  // const [data, setData] = useState([]);
  const dataContext = useContext(WebContext);
  const categoryData = dataContext.category;
  const dataFilter = categoryData.filter(
    (item) => item.ParentsId == 0 || !item.ParentsId
  );
  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h2 style={{ fontWeight: 400, margin: "10px 0" }}>CATEGORY</h2>
      <Row>
        {dataFilter?.length === 0 &&
          ["1", "2", "3", "4"].map((item) => {
            return (
              <Col
                key={item}
                style={{ marginBottom: 10 }}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                onClick={() => {}}
              >
                <Skeleton active />
              </Col>
            );
          })}
        {dataFilter?.map((item) => {
          return (
            <Col
              key={item.Id}
              style={{ marginBottom: 10 }}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              onClick={() => {}}
            >
              <Link to={`/product-category?categoryId=${item.Id}`}>
                <div
                  className="animate__animated animate__fadeInLeft"
                  style={{
                    margin: "5px",
                    height: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    boxShadow: "-1px 11px 9px -10px #93a7c3b8",
                    borderRadius: 10,
                    border: "1px solid #e6ebef",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: 80,
                      margin: "auto",
                    }}
                    src={"https://piseth.site/api/get-image/" + item.Image}
                  />
                  <span
                    style={{
                      display: "block",
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      background: "rgb(41 124 213 / 9%)",
                    }}
                  >
                    {item.Name}
                  </span>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

export default CategoryList;
