import update from 'immutability-helper';
import { useCallback } from 'react';

const { useState } = require('react');

const useTablePagination = () => {
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    total: 0,
    pageSize: 30,
    size: 'small',
    showTotal: (total, range) => `第${range[0]}到${range[1]}条,总计${total}条`,
    showSizeChanger: true,
    pageSizeOptions: ['30', '50', '100'],
  });

  const updateTablePagination = useCallback((pagination) => {
    setTablePagination((page) => {
      return update(page, { $merge: pagination });
    });
  }, []);

  return [tablePagination, updateTablePagination];
};

export default useTablePagination;
