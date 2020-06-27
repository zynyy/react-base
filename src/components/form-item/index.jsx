import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

export const FormItemPropTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rules: PropTypes.arrayOf(PropTypes.object),
};

const FormItem = ({ field, label, rules, children, ...restProps }) => {
  return (
    <Form.Item name={field} label={label} rules={rules} {...restProps}>
      {children}
    </Form.Item>
  );
};

FormItem.propTypes = {
  children: PropTypes.element.isRequired,
  ...FormItemPropTypes,
};

export default FormItem;
