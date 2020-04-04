import React from 'react';
import { Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

const ImportButton = () => {
  return (
    <Button icon={<ImportOutlined />} type="link">
      导入JSON
    </Button>
  );
};

export default ImportButton;
