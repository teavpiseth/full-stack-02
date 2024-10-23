import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Layout,
  Row,
  Space,
} from "antd";

import useRolePermission from "./useRolePermission";

export default function AddRolePermission() {
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const {
    submitHandle,
    form,
    activeKey,
    setActiveKey,
    list,
    setList,
    checked,
    roleList,
    setChecked,
  } = useRolePermission();

  function getChildren(data) {
    // console.log(data);
    // return <>hi</>;
    if (data?.children?.length > 0) {
      return data?.children?.map((item) => {
        return (
          <div key={item.Id}>
            <Checkbox
              onChange={(event) =>
                setChecked({ ...checked, [item.Id]: event.target.checked })
              }
              checked={checked[item.Id]}
            ></Checkbox>{" "}
            {item.Name}
          </div>
        );
      });
    } else {
      return [];
    }
  }

  console.log(checked, "checked");

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
              // style={{
              //   maxWidth: 600,
              // }}
            >
              <Form.Item
                name="name"
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
              <Row gutter={[16, 16]}>
                {list?.map((item) => (
                  <Col span={12} key={item.Id}>
                    <Collapse
                      items={[
                        {
                          key: item.Id,
                          label: (
                            <div>
                              <Checkbox
                                checked={checked[item.Id]}
                                onChange={(event) =>
                                  setChecked({
                                    ...checked,
                                    [item.Id]: event.target.checked,
                                  })
                                }
                              ></Checkbox>{" "}
                              {item.Name}
                            </div>
                          ),
                          children: getChildren(item),
                        },
                      ]}
                      collapsible="icon"
                      activeKey={item.activeKey}
                      onChange={(e) => {
                        const _list = list;
                        _list.map((_item) => {
                          if (_item.Id === item.Id) {
                            _item.activeKey = e;
                          }
                        });
                        setList([..._list]);
                      }}
                    />
                  </Col>
                ))}
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
