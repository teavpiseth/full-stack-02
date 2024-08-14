import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

const FooterWeb = React.memo(function FooterWeb() {
  return (
    <div
      style={{
        background: "rgb(246, 249, 252)",
        padding: "10px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <Row>
          <Col xs={24} sm={24} md={19} className="mb-4">
            <h3>QUICKLINKS</h3>
            <Row>
              <Col xs={12} sm={6}>
                <div>Lorem Ipsum</div>
              </Col>
              <Col xs={12} sm={6}>
                <div>Lorem Ipsum</div>
              </Col>
              <Col xs={12} sm={6}>
                <div>Lorem Ipsum</div>
              </Col>
              <Col xs={12} sm={6}>
                <div>Lorem Ipsum</div>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={5}>
            <h3>FOLLOW US</h3>

            <div>
              <FacebookOutlined /> Lorem Ipsum
            </div>
            <div>
              <InstagramOutlined /> Lorem Ipsum
            </div>
            <div>
              <YoutubeOutlined /> Lorem Ipsum
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          background: "#fff",
          textAlign: "center",
          padding: 10,
          marginTop: 40,
        }}
      >
        Piseth Shop © 2020. All Rights Reserved
      </div>
    </div>
  );
});

export default FooterWeb;
