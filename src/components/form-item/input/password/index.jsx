import React from 'react';
import { Input } from 'antd';

import FormItem, { FormItemPropTypes } from '@/components/form-item';

const { Password } = Input;

const PasswordItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <Password placeholder="请输入" autoComplete="off" {...restProps} />
    </FormItem>
  );
};

PasswordItem.propTypes = FormItemPropTypes;

export default PasswordItem;
