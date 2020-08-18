import FormItem from '@/components/form-item';
import { DatePicker } from 'antd';
import React from 'react';

const QuarterDatePickerItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <DatePicker {...restProps} placeholder="请选择季度" picker="quarter" />
    </FormItem>
  );
};

export default QuarterDatePickerItem;
