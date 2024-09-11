/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import moment from "moment";
import BaseService from "../../../../services/BaseService";
const AddEmployee = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = (values) => {
    BaseService.post("http://localhost:8081/api/employee/create", {
      ...values,
      dob: values.dob.format("YYYY-MM-DD"),
    });
  };
  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          style={{ width: "100%" }}
          onFinish={onFinish}
          name="layout-multiple-horizontal"
        >
          {/* Name Image Gender Dob Tel Email Address Status */}

          <Form.Item
            style={{ display: "block" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="input name" name="name" />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              allowClear
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "other",
                  label: "Other",
                },
              ]}
              placeholder="select it"
            />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Date of birth"
            name="dob"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={() => {}} form="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Tel"
            name="tel"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Address"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Status"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default AddEmployee;
