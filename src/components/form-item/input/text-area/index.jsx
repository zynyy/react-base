import FormItem from '@/components/form-item';
import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const TextAreaItem = ({ field, label, rules, labelCol, wrapperCol, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules} labelCol={labelCol} wrapperCol={wrapperCol}>
    <TextArea placeholder="请输入" autoComplete="off" rows={2} {...restProps} />
  </FormItem>
);

export default TextAreaItem;
