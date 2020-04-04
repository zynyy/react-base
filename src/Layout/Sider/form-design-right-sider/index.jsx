import React from 'react';

import { Layout, Tabs } from 'antd';

const { Sider } = Layout;

const { TabPane } = Tabs;

const FormDesignRightSider = () => {
  return (
    <Sider
      style={{
        width: '25%',
      }}
    >
      <Tabs>
        <TabPane tab="控件属性" key="widget" />
        <TabPane tab="表单属性" key="form" />
      </Tabs>
    </Sider>
  );
};

export default FormDesignRightSider;
