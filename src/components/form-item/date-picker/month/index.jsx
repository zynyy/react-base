import FormItem from '@/components/form-item';
import { DatePicker } from 'antd';
import React from 'react';

const MonthDatePickerItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <DatePicker {...restProps} placeholder="请选择月份" picker="month" />
  </FormItem>
);

export default MonthDatePickerItem;
