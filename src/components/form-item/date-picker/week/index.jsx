import FormItem from '@/components/form-item';
import { DatePicker } from 'antd';
import React from 'react';

const WeekDatePickerItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <DatePicker {...restProps} placeholder="请选择周期" picker="week" />
    </FormItem>
  );
};

export default WeekDatePickerItem;
