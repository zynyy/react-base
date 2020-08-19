import { delClient, selectClient } from '@/services/main/client';
import { DEFAULT_TABLE_PADINATION } from '@/utils/define';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Spin, Table } from 'antd';
import update from 'immutability-helper';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchClientForm from './SearchClientForm';

class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      tablePagination: DEFAULT_TABLE_PADINATION,
      dataSource: [],
      columns: this.generateClumns(),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  generateClumns = () => {
    const { match } = this.props;
    const { path } = match;
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
                onConfirm={() => this.handleDeleteConfirm(highId)}
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

  fetchData = () => {
    const { validateFields } = this.formRef;

    const { tablePagination } = this.state;
    const { current, pageSize } = tablePagination;

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

      this.setState({
        loading: true,
      });
      selectClient(params)
        .then((res) => {
          const { data } = res;

          const { total, rows } = data;

          console.log(tablePagination);

          this.setState({
            tablePagination: update(tablePagination, {
              $merge: {
                total,
              },
            }),
            dataSource: rows.map((item) => {
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
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    });
  };

  handleDeleteConfirm = (highId) => {
    this.setState({
      loading: true,
    });

    const params = { highSeasId: highId, disabled: 1 };

    delClient(params)
      .then(() => {
        this.fetchData();
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleSearch = () => {
    const { tablePagination } = this.state;

    this.setState(
      {
        tablePagination: update(tablePagination, {
          $merge: {
            current: 1,
          },
        }),
      },
      () => {
        this.fetchData();
      },
    );
  };

  handleTableChange = (pagination) => {
    this.setState(
      {
        tablePagination: pagination,
      },
      () => {
        this.fetchData();
      },
    );
  };

  bindRef = (ref) => {
    this.formRef = ref;
  };

  renderTableTitle = () => {
    const { match } = this.props;
    const { path } = match;
    return (
      <Link to={`${path}/new`}>
        <PlusOutlined />
        新增
      </Link>
    );
  };

  render() {
    const { loading, dataSource, columns, tablePagination } = this.state;

    return (
      <Spin spinning={loading}>
        <SearchClientForm formRef={this.bindRef} onSearch={this.handleSearch} />

        <Table
          title={this.renderTableTitle}
          dataSource={dataSource}
          columns={columns}
          pagination={tablePagination}
          rowKey="rowKey"
          onChange={this.handleTableChange}
        />
      </Spin>
    );
  }
}

export default Client;
