import React from 'react';
import { Button, Result } from 'antd';

import { useHistory } from 'react-router-dom';

const NoFoundPage = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={
        <Button type="primary" onClick={handleClick}>
          返回登录页
        </Button>
      }
    />
  );
};
export default NoFoundPage;
