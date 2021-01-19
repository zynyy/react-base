import FormItem from '@/components/form-item';
import { Checkbox } from 'antd';
import React from 'react';

const CheckboxItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules} valuePropName="checked">
    <Checkbox {...restProps} />
  </FormItem>
);

export default CheckboxItem;
