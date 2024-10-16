import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect } from "react";
import AccessKeyService from "./AccessKeyService";
import  StringUtil from "../../../utils/String";
// eslint-disable-next-line react/prop-types
function AddNew({ setOpenDialog, list, dialog, close }) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [form] = Form.useForm();

  async function submitHandle(values) {
    const isEdit = form.getFieldValue("id")?.toString() ? true : false;
    let _values = values;
    let res = null;
    if (isEdit) {
      _values.id = form.getFieldValue("id");
      res = await AccessKeyService.update(_values);
    } else {
      res = await AccessKeyService.addNew(_values);
    }

    if (res?.data) {
      close();
    }
  }

  function validateCode(_, value) {
    if (value && value.includes(" ")) {
      return Promise.reject("Role cannot contain spaces");
    }
    return Promise.resolve();
  }

  useEffect(() => {
    if (dialog?.isEdit) {
      const data = list.find((role) => role.Id === dialog.editId);

      form.setFieldsValue({
        id: data.Id,
        name: data.Name,
        code: data.Code,
        status: data.Status,
        parentId: data.ParentId
      });
    } else {
      form.resetFields();
    }
  }, [dialog, list, form]);
  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={(values) => {
          submitHandle(values);
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[{ required: true }, { validator: validateCode }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={() => {}}
            allowClear
          >
            <Select.Option value={1}>
              {StringUtil.getNameStatus(1)}
            </Select.Option>
            <Select.Option value={0}>
              {StringUtil.getNameStatus(0)}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="parentId" label="Parent">
          <Select
            showSearch
            placeholder="Select a option and change input text above"
            optionFilterProp="label"
            allowClear
            options={list.map((item) => ({ label: item.Name, value: item.Id }))}
          ></Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              htmlType="button"
              onClick={() =>
                setOpenDialog((value) => ({
                  ...value,
                  open: false,
                  isEdit: false,
                }))
              }
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default React.memo(AddNew);
