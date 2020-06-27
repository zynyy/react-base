import React from 'react';

import { Row, Col } from 'antd';

const GlobalHeader = () => {
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
        <Col span={24}>头部</Col>
      </Row>
    </>
  );
};

export default GlobalHeader;
