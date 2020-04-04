import React from 'react';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const SyncButton = () => {
  return (
    <Button icon={<SyncOutlined />} type="link">
      重新设计
    </Button>
  );
};

export default SyncButton;
