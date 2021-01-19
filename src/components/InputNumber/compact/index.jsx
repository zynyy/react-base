import CompactBeforeAfter from '@/components/compact-before-after';
import { InputNumber } from 'antd';
import React, { forwardRef } from 'react';

const InputNumberCompact = ({ addAfter, addBefore, ...restProps }, ref) => (
  <CompactBeforeAfter addAfter={addAfter} addBefore={addBefore} ref={ref}>
    <InputNumber
      placeholder="请输入"
      {...restProps}
      style={{
        width: '100%',
      }}
    />
  </CompactBeforeAfter>
);

export default forwardRef(InputNumberCompact);
