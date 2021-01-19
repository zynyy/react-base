import FormItem from '@/components/form-item';
import InputNumberCompact from '@/components/InputNumber/compact';
import React from 'react';

const InputNumberCompactItem = ({ label, field, rules, ...restProps }) => (
  <FormItem label={label} field={field} rules={rules}>
    <InputNumberCompact {...restProps} />
  </FormItem>
);

export default InputNumberCompactItem;
