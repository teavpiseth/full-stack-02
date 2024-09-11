/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import BaseService from "../../../../services/BaseService";
const AddEmployee = ({ isOpen, setIsOpen, fetchData, edit }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(isOpen);
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    const result = await BaseService.post(
      "http://localhost:8081/api/employee/create",
      {
        ...values,
        image: values.firstName,
        dob: values.dob.format("YYYY-MM-DD"),
      }
    );
    if (result) {
      setIsOpen(false);
      fetchData();
    }
  };

  useEffect(() => {
    // setOpen(isOpen);
    form.setFieldValue("gender", edit.data.Gender);
    form.setFieldValue("tel", edit.data.Tel);
    form.setFieldValue("address", edit.data.Address);
    form.setFieldValue("status", edit.data.Status);
    form.setFieldValue("email", edit.data.Email);
  }, [edit, form]);
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
          form={form}
          style={{ width: "100%" }}
          onFinish={onFinish}
          name="layout-multiple-horizontal"
        >
          {/* Name Image Gender Dob Tel Email Address Status */}
          <Form.Item
            style={{ display: "block" }}
            label="First Name"
            name="firstName"
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
            label="Last Name"
            name="lastName"
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
