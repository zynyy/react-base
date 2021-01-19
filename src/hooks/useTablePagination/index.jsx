import { DEFAULT_TABLE_PADINATION } from '@/utils/define';
import update from 'immutability-helper';
import { useCallback, useState } from 'react';

const useTablePagination = () => {
  const [tablePagination, setTablePagination] = useState(DEFAULT_TABLE_PADINATION);

  const updateTablePagination = useCallback((pagination) => {
    setTablePagination((page) => update(page, { $merge: pagination }));
  }, []);

  return [tablePagination, updateTablePagination];
};

export default useTablePagination;
