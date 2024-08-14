import { Carousel, Col, Row } from "antd";
import React from "react";
import Slide1 from "../../assets/images/web/slide/slide1.jpg";
import Slide2 from "../../assets/images/web/slide/slide2.jpg";
import Slide3 from "../../assets/images/web/slide/slide3.jpg";
import Slide4 from "../../assets/images/web/slide/slide4.jpg";
import Small1 from "../../assets/images/web/slide/small1.jpg";
import Small2 from "../../assets/images/web/slide/small2.jpg";
import "./slide.css";
const Slide = React.memo(function Slide() {
  return (
    <div className="slide-web-style">
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <Row>
          <Col xs={24} sm={14} md={18}>
            <Carousel autoplay>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Slide1}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Slide2}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Slide3}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Slide4}
                    alt="banner"
                  />
                </div>
              </div>
            </Carousel>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Carousel autoplay>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Small1}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Small2}
                    alt="banner"
                  />
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default Slide;
