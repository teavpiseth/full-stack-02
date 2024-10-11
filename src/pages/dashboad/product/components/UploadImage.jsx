/* eslint-disable react/prop-types */
import { Button, Form, message, Modal } from "antd";
import { useState } from "react";
import BaseService from "../../../../services/BaseService";

export default function UploadImage({
  isOpen,
  setIsOpenModelUpload,
  uploadProductId,
}) {
  const [open, setIsOpen] = useState(isOpen);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setIsOpenModelUpload(false);
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpenModelUpload(false);
    setIsOpen(false);
  };
  const [form] = Form.useForm();

  async function onFinish() {
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("productId", uploadProductId);
    formData.append("updateBy", 8);
    formData.append("createBy", 8);
    const result = await BaseService.post(
      `http://localhost:8081/api/product/upload`,
      formData,
      { contentType: "multipart/form-data" }
    );
    console.log(result);
    setLoading(false);
  }

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    // Limit the number of files to 5
    if (files.length + selectedFiles.length > 3) {
      message.error("You can only upload a maximum of 5 images.");
      form.setFields([
        {
          name: "images",
          errors: ["limit only 3"],
        },
      ]);
      return;
    }
    const newSelectedFiles = [...selectedFiles, ...files];
    form.setFieldValue("images", newSelectedFiles);
    setSelectedFiles(newSelectedFiles);

    const previews = newSelectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  return (
    <div>
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
            label="Images"
            name="images"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              multiple
              accept="image/*"
              type="file"
              onChange={handleUpload}
            />
            <div>
              {imagePreviews.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px",
                        boxShadow: "0 0 0 1px #ccc",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
