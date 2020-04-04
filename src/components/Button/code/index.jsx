import React from 'react';
import { Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

const CodeButton = () => {
  return (
    <Button icon={<CodeOutlined />} type="link">
      生成代码
    </Button>
  );
};

export default CodeButton;
