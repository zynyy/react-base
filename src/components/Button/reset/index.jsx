import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ResetButton = ({ form }) => {
  const handleClick = () => {
    form.resetFields();
  };

  return (
    <Button icon={<RedoOutlined />} onClick={handleClick}>
      重置
    </Button>
  );
};

export default ResetButton;
