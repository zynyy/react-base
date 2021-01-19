import { Layout } from 'antd';
import React from 'react';
import GlobalHeader from './Header/global-header';
import LeftNavClass from './Sider/left-nav/LeftNavClass';

const { Content, Header } = Layout;

const BasicLayout = ({ children }) => (
  <Layout
    style={{
      height: '100%',
    }}
  >
    <Header>
      <GlobalHeader />
    </Header>

    <Layout>
      <LeftNavClass collapsed={false} />

      <Layout style={{ paddingTop: 10 }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  </Layout>
);

export default BasicLayout;
