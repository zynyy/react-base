import InputNumberItem from '@/components/form-item/input-number';
import InputNumberCompactItem from '@/components/form-item/input-number/compact';
import { Card } from 'antd';
import React from 'react';

const InputNumberWidget = () => {
  return (
    <Card title="数字框">
      <InputNumberItem field="inputNumber" label="基本框" />
      <InputNumberCompactItem
        field="InputNumberCompact"
        label="组合框"
        addAfter="后置标签"
        addBefore="前置标签"
      />
    </Card>
  );
};

export default InputNumberWidget;
