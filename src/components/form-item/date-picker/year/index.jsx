import FormItem from '@/components/form-item';
import { DatePicker } from 'antd';
import React from 'react';

const YearDatePickerItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <DatePicker {...restProps} placeholder="请选择年份" picker="year" />
  </FormItem>
);

export default YearDatePickerItem;
