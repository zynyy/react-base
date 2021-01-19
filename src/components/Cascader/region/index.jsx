import { handleCascaderFilter } from '@/utils/PinYin';
import { Cascader } from 'antd';
import React from 'react';
import REIONG from './region';

const RegionCascader = (props) => (
  <Cascader
    {...props}
    changeOnSelect
    placeholder="请选择地区"
    options={REIONG}
    showSearch={{
      filter: handleCascaderFilter,
    }}
  />
);

export default RegionCascader;
