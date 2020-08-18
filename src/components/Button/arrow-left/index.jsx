import useGoBackList from '@/hooks/useGoBackList';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ReturnArrowLeftButton = () => {
  const [goBack] = useGoBackList();

  const handleClick = () => {
    goBack();
  };

  return (
    <Button icon={<ArrowLeftOutlined />} style={{ marginRight: 10 }} onClick={handleClick}>
      返回列表
    </Button>
  );
};

export default ReturnArrowLeftButton;
