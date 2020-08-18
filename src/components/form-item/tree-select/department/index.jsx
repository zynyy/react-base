import FormItem from '@/components/form-item';
import DepartmentTreeSelect from '@/components/TreeSelect/department';
import React from 'react';

const DepartmentItem = ({ field, label, rules, ...restProps }) => {
  return (
    <FormItem field={field} label={label} rules={rules}>
      <DepartmentTreeSelect {...restProps} />
    </FormItem>
  );
};

export default DepartmentItem;
