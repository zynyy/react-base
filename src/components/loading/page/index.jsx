import { Spin } from 'antd';
import React from 'react';

const PageLoading = () => (
  <div style={{ textAlign: 'center' }}>
    <Spin size="large" tip="页面加载中。。。。" />
  </div>
);

export default PageLoading;
