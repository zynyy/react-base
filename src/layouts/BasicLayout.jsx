import React from 'react';
import { Layout } from 'antd';
import LeftNavSider from './Sider/left-nav';
import GlobalHeader from './Header/global-header';

const { Content, Header } = Layout;

const BasicLayout = () => {
  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Header>
        <GlobalHeader />
      </Header>

      <Layout>
        <LeftNavSider collapsed={false} />

        <Layout style={{ paddingTop: 10 }}>
          <Content />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
