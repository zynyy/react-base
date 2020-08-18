import { Layout } from 'antd';
import React from 'react';
import GlobalHeader from './Header/global-header';
// import LeftNavClass from './Sider/left-nav/LeftNavClass';
import LeftNavClass from './Sider/left-nav';

const { Content, Header } = Layout;

const BasicLayout = ({ children }) => {
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
        <LeftNavClass collapsed={false} />

        <Layout>
          <Content
            style={{
              padding: 10,
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
