import { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getImageView, getImageViewServer } from "../utils/constant";
import LocalStorage from "../utils/LocalStorage";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Employee", "/dashboard/employee", <PieChartOutlined />),
  getItem("Customer", "/dashboard/customer", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Product", "product", <TeamOutlined />, [
    getItem("category", "/dashboard/category"),
    getItem("product-list", "/dashboard/product-list"),
  ]),
  getItem("Role", "/dashboard/role", <TeamOutlined />, [
    getItem("Assess Key", "/dashboard/accessKey"),
    getItem("Role", "/dashboard/role"),
  ]),
  getItem("Files", "/dashboard/Files", <FileOutlined />),
  getItem("Logout", "/dashboard/login", <LogoutOutlined />),
];
const MasterLayoutDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/dashboard/login");
    }
  }, []);
  if (!localStorage.getItem("user")) {
    return <></>;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={(value) => {
            if (value.key?.includes("login")) {
              localStorage.clear();
            }
            navigate(value.key);
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              background: "#fff",
              padding: 10,
              marginBottom: 10,
              width: "100%",
              textAlign: "right",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            Name:{" "}
            {LocalStorage.getUser().FirstName +
              " " +
              LocalStorage.getUser().LastName}
            <img
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                marginLeft: 10,
              }}
              src={getImageViewServer(LocalStorage.getUser().Image)}
            />
          </div>
        </div>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Full stack ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MasterLayoutDashboard;
