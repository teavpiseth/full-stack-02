/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import BaseService from "../../../../services/BaseService";
import { getImageViewServer } from "../../../../utils/constant";
const AddCategory = ({ isOpen, setIsOpen, fetchData, edit, categoryList }) => {
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
      const formData = new FormData();
      formData.append("id", edit.data.Id);
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("status", values.status);
      if (values.parentsId) {
        formData.append("parentsId", values.parentsId);
      }
      formData.append("imageOld", edit.data.Image);
      const result = await BaseService.put(
        `http://localhost:8081/api/category/update`,
        formData,
        { "content-type": "multipart/form-data" }
      );
      if (result) {
        setIsOpen(false);
        fetchData();
      }
    } else {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("status", values.status);
      if (values.parentsId) {
        formData.append("parentsId", values.parentsId);
      }
      const result = await BaseService.post(
        "http://localhost:8081/api/category/create",
        formData,
        { "content-type": "multipart/form-data" }
      );

      if (result) {
        setIsOpen(false);
        fetchData();
      }
    }
  };

  useEffect(() => {
    if (edit.isEdit) {
      form.setFieldValue("status", edit.data.Status);
      form.setFieldValue("name", edit.data.Name);
      form.setFieldValue("image", edit.data.Image);
      form.setFieldValue("description", edit.data.Description);
      form.setFieldValue("parentsId", edit.data.ParentsId);
    }
  }, [edit, form]);

  const [previewImage, setPreviewImage] = useState("");

  function handleUpload(e) {
    if (e.target.files[0]) {
      form.setFieldValue("image", e.target.files[0]);
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(previewUrl);
    }
  }

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
          {/* Name Image Gender Dob Tel Email Address Status */}
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
            label="Parent"
            name="parentsId"
          >
            <Select options={listOption}></Select>
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

          <Form.Item
            style={{ display: "block" }}
            layout="horizontal"
            label="Image"
            name="image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {edit.isEdit && !previewImage && (
              <img
                style={{ width: "300px" }}
                src={getImageViewServer(edit.data.Image)}
              />
            )}
            {previewImage && (
              <img style={{ width: "300px" }} src={previewImage} />
            )}
            <input type="file" onChange={handleUpload} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default AddCategory;
