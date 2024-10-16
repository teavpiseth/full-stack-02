import { Button, Col, Collapse, Form, Input, Layout, Row, Space } from "antd";
import React from "react";
import useRolePermission from "./useRolePermission";
import { NoPermission } from "src/components/Exception";

export default function AddRolePermission() {
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const { panelList, submitHandle, form, param } = useRolePermission();

  if(!param?.Id?.toString()){
    return <NoPermission></NoPermission>
  }
  return (
    <>
      <Layout>
        <Layout.Content>
          <div style={{ background: "#fff", padding: 24 }}>
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
                name="roleName"
                label="Role"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>

              {/* Panel blog */}
              <Row gutter={16}>
                {panelList.map((item) => {
                  return (
                    <Col key={item.key} className="gutter-row" span={8}>
                      <Collapse items={[item]}></Collapse>
                    </Col>
                  );
                })}
              </Row>
              <Form.Item style={{ marginTop: 20 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}
