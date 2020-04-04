import React from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const EyeButton = () => {
  return (
    <Button icon={<EyeOutlined />} type="link">
      预览表单
    </Button>
  );
};

export default EyeButton;
