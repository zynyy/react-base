import useTablePagination from '@/hooks/useTablePagination';
import { delClient, selectClient } from '@/services/main/client';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Spin, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchClientForm from './SearchClientForm';

const Client = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [tablePagination, updateTablePagination] = useTablePagination();
  const [dataSource, setDataSource] = useState([]);
  const { path } = match;
  const { current, pageSize } = tablePagination;

  const [form] = Form.useForm();

  const fetchData = useCallback(() => {
    const { validateFields } = form;

    validateFields().then((values) => {
      const { name } = values;

      const params = {
        pageNum: current,
        pageSize,
        porder: 'h.update_date',
        psort: 'DESC',
        keyWord: name || null,
        signs: 0,
        participantType: 0,
        pageName: 'developmentClientList--myTakeCharge',
      };

      setLoading(true);
      selectClient(params)
        .then((res) => {
          const { data } = res;

          const { total, rows } = data;

          updateTablePagination({ total });

          setDataSource(
            rows.map((item) => {
              const { clientName, id, mobile, remark, highId } = item;
              const { contactName, contactMobile } = mobile;
              return {
                clientName,
                id,
                mobile,
                remark,
                contactName,
                contactMobile,
                rowKey: id,
                highId,
              };
            }),
          );

          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [form, current, pageSize]);

  const handleDeleteConfirm = (highId) => {
    setLoading(true);

    const params = { highSeasId: highId, disabled: 1 };

    delClient(params)
      .then(() => {
        fetchData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generateClumns = () => {
    return [
      {
        title: '行号',
        dataIndex: 'line',
        render: (text, record, index) => index + 1,
      },
      {
        title: '公司名称',
        dataIndex: 'clientName',
      },
      {
        title: '联系人',
        dataIndex: 'contactName',
      },
      {
        title: '手机号',
        dataIndex: 'contactMobile',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'rowKey',
        render: (text, record) => {
          const { id, clientName, highId } = record;
          return (
            <>
              <Popconfirm
                title={`是否确定删除-${clientName}`}
                onConfirm={() => handleDeleteConfirm(highId)}
              >
                <Button type="link">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>

              <Link to={`${path}/new/${id}/${highId}`}>
                <EditOutlined />
              </Link>
            </>
          );
        },
      },
    ];
  };

  const [columns] = useState(generateClumns());

  const handleSearch = () => {
    if (current === 1) {
      fetchData();
    } else {
      updateTablePagination({
        current: 1,
      });
    }
  };

  const handleTableChange = (pagination) => {
    const { current: nextCurrent, pageSize: nextPageSize } = pagination;

    if (nextCurrent !== current) {
      updateTablePagination({
        current: nextCurrent,
      });
    } else if (nextPageSize !== pageSize) {
      updateTablePagination({
        pageSize: nextPageSize,
      });
    }
  };

  const renderTableTitle = () => {
    return (
      <Link to={`${path}/new`}>
        <PlusOutlined />
        新增
      </Link>
    );
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Spin spinning={loading}>
      <SearchClientForm form={form} onSearch={handleSearch} />

      <Table
        title={renderTableTitle}
        dataSource={dataSource}
        columns={columns}
        pagination={tablePagination}
        rowKey="rowKey"
        onChange={handleTableChange}
      />
    </Spin>
  );
};
export default Client;
