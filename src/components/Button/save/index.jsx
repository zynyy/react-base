import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const SaveButton = ({ onClick }) => {
  return (
    <Button icon={<SaveOutlined />} type="primary" onClick={onClick}>
      保存
    </Button>
  );
};

export default SaveButton;
