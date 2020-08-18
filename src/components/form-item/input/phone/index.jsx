import InputItem from '@/components/form-item/input';
import React from 'react';

const PHONE_REGEXP = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;

const PhoneItem = ({ label, field, required, ...restPorps }) => {
  return (
    <InputItem
      label={label}
      field={field}
      rules={[
        {
          required,
          message: '请输入的手机号',
        },
        {
          pattern: PHONE_REGEXP,
          message: '输入的手机号不正确仅支持(13,14,15,166,17,18,189,199)号码段',
        },
      ]}
      placeholder="请输入手机号码"
      allowClear
      {...restPorps}
    />
  );
};

export default PhoneItem;
