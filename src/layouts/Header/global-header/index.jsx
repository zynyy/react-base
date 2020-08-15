import { Button, Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const GlobalHeader = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
  };

  return (
    <>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{
          height: '100%',
        }}
      >
        <Col span={24}>
          <Button onClick={handleClick}>退出登录</Button>
        </Col>
      </Row>
    </>
  );
};

export default GlobalHeader;
