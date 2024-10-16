import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import image from "../../assets/images/login_image.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
import LocalStorage from "../../utils/LocalStorage";
import BaseService from "../../services/BaseService";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    loginHandler(values);
    // localStorage.setItem("login", "true");
    // navigate("/dashboard");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function loginHandler(value) {
    const res = await BaseService.post(
      "http://localhost:8081/api/employee/login",
      value
    );
    // console.log(res, "res");
    if (res) {
      LocalStorage.setUserInfo(res.data);
      navigate("/dashboard");
    }
  }
  return (
    <>
      <img
        style={{ maxWidth: "190px", display: "block", margin: "auto" }}
        src={image}
        alt="login"
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="tel"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
