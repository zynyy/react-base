import FormItem from '@/components/form-item';
import { Input } from 'antd';
import React from 'react';

const InputItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <Input placeholder="请输入" autoComplete="off" {...restProps} />
  </FormItem>
);

export default InputItem;
