import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const SearchButton = ({ onClick }) => {
  return (
    <Button icon={<SearchOutlined />} type="primary" style={{ marginRight: 10 }} onClick={onClick}>
      搜索
    </Button>
  );
};

export default SearchButton;
