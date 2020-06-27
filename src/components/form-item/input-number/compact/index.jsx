import React from 'react';
import FormItem, { FormItemPropTypes } from '@/components/form-item';

import CompactInputNumber from '@/components/InputNumber/compact';

const CompactInputNumberItem = ({ label, field, rules, ...restProps }) => {
  return (
    <FormItem label={label} field={field} rules={rules}>
      <CompactInputNumber {...restProps} />
    </FormItem>
  );
};

CompactInputNumberItem.propTypes = FormItemPropTypes;

export default CompactInputNumberItem;
