import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Profil from "../Profil/Profil";

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define the menu items using the `items` prop
  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/home",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    /* {
      key: "/banner",
      icon: <SlidersOutlined />,
      label: <Link to="/banner">Slide</Link>,
    }, */
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[location.pathname]}
          style={{ minHeight: "100vh" }}
          className="pt-14"
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "fixed",
            width: `calc(100% - ${collapsed ? "80px" : "200px"})`,
            left: collapsed ? 80 : 200,
            zIndex: 21,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>

            <div className="mr-5">
              <Profil />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px 0", // top left/right bottom
            padding: 24,
            marginTop: 80, // pour compenser la hauteur de l'en-tête
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <span className="font-semibold">FYLE</span> ©{" "}
          {new Date().getFullYear()} Tous droits Réservés.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
