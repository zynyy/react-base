import InputItem from '@/components/form-item/input';
import PasswordItem from '@/components/form-item/input/password';
import TextAreaItem from '@/components/form-item/input/text-area';
import { Card } from 'antd';
import React from 'react';

const InputWidget = () => (
  <Card title="输入框">
    <InputItem field="input" label="基本框" />
    <InputItem
      field="high"
      label="组合框"
      addonAfter="后置标签"
      addonBefore="前置标签"
      prefix="前缀"
      suffix="后缀"
    />
    <PasswordItem field="password" label="密码框" />
    <TextAreaItem field="textArea" label="文本框" />
  </Card>
);

export default InputWidget;
