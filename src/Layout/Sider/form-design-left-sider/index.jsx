import React from 'react';

import { Card, Layout } from 'antd';

const { Sider } = Layout;

const FormDesignLeftSider = () => {
  return (
    <Sider
      style={{
        width: '25%',
      }}
    >
      <Card title="基础控件" />
      <Card title="高级控件" />
      <Card title="布局" />
    </Sider>
  );
};

export default FormDesignLeftSider;
