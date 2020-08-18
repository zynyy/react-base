import { getDepartmentAll } from '@/services/common';
import { TreeSelect } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { transformTreeData } from '../util';

const DepartmentTreeSelect = (props) => {
  const [treeData, setTreeData] = useState([]);

  const fetchData = useCallback(() => {
    getDepartmentAll().then((res) => {
      const { data } = res;

      setTreeData(transformTreeData(data));
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <TreeSelect
      {...props}
      placeholder="请选择部门"
      style={{ width: '100%' }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
    />
  );
};

export default DepartmentTreeSelect;
