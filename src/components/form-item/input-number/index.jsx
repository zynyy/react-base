import React from 'react';

import { InputNumber } from 'antd';

import FormItem, { FormItemPropTypes } from '@/components/form-item';

const InputNumberItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <InputNumber placeholder="请输入" autoComplete="off" {...restProps} />
    </FormItem>
  );
};

InputNumberItem.propTypes = FormItemPropTypes;

export default InputNumberItem;
