import React, { forwardRef } from 'react';

import { InputNumber } from 'antd';

import CompactBeforeAfter from '@/components/compact-before-after';

// eslint-disable-next-line react/prop-types
const CompactInputNumber = ({ addAfter, addBefore, ...restProps }, ref) => {
  return (
    <CompactBeforeAfter addAfter={addAfter} addBefore={addBefore} ref={ref}>
      <InputNumber
        {...restProps}
        style={{
          width: '100%',
        }}
      />
    </CompactBeforeAfter>
  );
};

export default forwardRef(CompactInputNumber);
