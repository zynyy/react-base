import React, { forwardRef } from 'react';

import { InputNumber } from 'antd';

import CompactBeforeAfter, { CompactBeforeAfterPropTypes } from '@/components/compact-before-after';

const CompactInputNumber = ({ addAfter, addBefore, ...restProps }, ref) => {
  return (
    <CompactBeforeAfter addAfter={addAfter} addBefore={addBefore}>
      <InputNumber
        {...restProps}
        style={{
          width: '100%',
        }}
        ref={ref}
      />
    </CompactBeforeAfter>
  );
};
CompactInputNumber.propTypes = CompactBeforeAfterPropTypes;

export default forwardRef(CompactInputNumber);
