import React from 'react';
import { Button, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

const RedoButton = () => (
  <Tooltip title="回滚上一次操作">
    <Button icon={<RedoOutlined />} type="link">
      撤销
    </Button>
  </Tooltip>
);

export default RedoButton;
