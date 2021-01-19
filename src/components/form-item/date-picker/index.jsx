import FormItem from '@/components/form-item';
import { DatePicker } from 'antd';
import React from 'react';

const DatePickerItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <DatePicker placeholder="请选择日期" {...restProps} />
  </FormItem>
);

export default DatePickerItem;
