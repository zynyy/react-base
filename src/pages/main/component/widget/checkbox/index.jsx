import CheckboxItem from '@/components/form-item/checkbox';
import CheckboxGroupItem from '@/components/form-item/checkbox/group';
import { Card } from 'antd';
import React from 'react';

const CheckboxWidget = () => {
  return (
    <Card title="选择框">
      <CheckboxItem field="checkbox" label="基本" />
      <CheckboxGroupItem field="checkbox-group" label="多选" dataSource={['A', 'B', 'C', 'D']} />
    </Card>
  );
};

export default CheckboxWidget;
