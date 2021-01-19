import React from 'react';
import { Button, Tooltip } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

const UndoButton = () => (
  <Tooltip title="恢复前一次操作">
    <Button icon={<UndoOutlined />} type="link">
      前进
    </Button>
  </Tooltip>
);

export default UndoButton;
