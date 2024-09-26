/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import BaseService from "../../../../services/BaseService";
const AddProduct = ({ isOpen, setIsOpen, fetchData, edit, categoryList }) => {
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
    if (edit.isEdit) {
      // return console.log(values);
      const result = await BaseService.put(
        `http://localhost:8081/api/product/update`,
        { ...values, updateBy: 8, createBy: 8, id: edit.data.Id }
      );
      if (result) {
        setIsOpen(false);
        fetchData();
      }
    } else {
      const result = await BaseService.post(
        "http://localhost:8081/api/product/create",
        { ...values, updateBy: 8, createBy: 8 }
      );

      if (result) {
        setIsOpen(false);
        fetchData();
      }
    }
  };

  useEffect(() => {
    if (edit.isEdit) {
      form.setFieldValue("status", edit.data.Status?.toString());
      form.setFieldValue("name", edit.data.Name);
      form.setFieldValue("description", edit.data.Description);
      form.setFieldValue("id", edit.data.Id);
      form.setFieldsValue({
        categoryId: edit.data.CategoryId,
        qty: edit.data.Qty,
        price: edit.data.Price,
        discountPercent: edit.data.DiscountPercent,
        discountPrice: edit.data.DiscountPrice,
        discountAmount: edit.data.DiscountAmount,
        netPrice: edit.data.NetPrice,
      });
    }
  }, [edit, form]);

  const listOption = useMemo(() => {
    return categoryList?.map((item) => {
      return {
        value: item.Id,
        label: item.Name,
      };
    });
  }, [categoryList]);

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
          <Form.Item
            style={{ display: "block" }}
            label="Name"
            name="name"
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
            label="Description"
            name="description"
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
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: "100%" }}
              options={listOption}
              placeholder="Please select"
            />
          </Form.Item>
          <Form.Item
            style={{ display: "block" }}
            label="Qty"
            name="qty"
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
            label="Price"
            name="price"
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
            label="Discount Percent"
            name="discountPercent"
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
            label="Discount Amount"
            name="discountAmount"
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
            label="Net Price"
            name="netPrice"
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
export default AddProduct;
