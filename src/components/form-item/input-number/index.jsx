import FormItem, { FormItemPropTypes } from '@/components/form-item';
import { InputNumber } from 'antd';
import React from 'react';

const InputNumberItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <InputNumber
      placeholder="请输入"
      autoComplete="off"
      style={{
        width: '100%',
      }}
      {...restProps}
    />
  </FormItem>
);

InputNumberItem.propTypes = FormItemPropTypes;

export default InputNumberItem;
