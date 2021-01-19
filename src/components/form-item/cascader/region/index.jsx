import RegionCascader from '@/components/Cascader/region';
import FormItem from '@/components/form-item';
import React from 'react';

const RegionItem = ({ field, label, rules, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <RegionCascader {...restProps} />
  </FormItem>
);

export default RegionItem;
