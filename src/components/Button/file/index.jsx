import React from 'react';
import { Button } from 'antd';
import { FileOutlined } from '@ant-design/icons';

const FileButton = () => {
  return (
    <Button icon={<FileOutlined />} type="link">
      生成JSON
    </Button>
  );
};

export default FileButton;
