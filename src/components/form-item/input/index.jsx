import React from 'react';
import { Input } from 'antd';

import FormItem, { FormItemPropTypes } from '@/components/form-item';

const InputItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <Input placeholder="请输入" autoComplete="off" {...restProps} />
    </FormItem>
  );
};

InputItem.propTypes = FormItemPropTypes;

export default InputItem;
