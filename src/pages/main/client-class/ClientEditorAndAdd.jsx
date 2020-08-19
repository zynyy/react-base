import ReturnArrowLeftButton from '@/components/Button/arrow-left';
import SaveButton from '@/components/Button/save';
import RegionItem from '@/components/form-item/cascader/region';
import InputItem from '@/components/form-item/input';
import PhoneItem from '@/components/form-item/input/phone';
import TextAreaItem from '@/components/form-item/input/text-area';
import DepartmentItem from '@/components/form-item/tree-select/department';
import { addClient, selectClientOne, updateClient } from '@/services/main/client';
import { DEFAULT_FORM_ITEM_LAYOUT } from '@/utils/define';
import { goBackList } from '@/utils/utils';
import { Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';

class ClientEditorAndAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    const {
      params: { id, highSeasId },
    } = match;

    if (id && highSeasId) {
      this.fetchData({ id, highSeasId, type: 0 });
    }
  }

  handleReset = () => {
    const { resetFields } = this.formRef;
    resetFields();
  };

  fetchData = (params) => {
    const { setFieldsValue } = this.formRef;

    this.setState({
      loading: true,
    });

    selectClientOne(params)
      .then((res) => {
        const { data } = res;

        const {
          provId,
          remark,
          mobile,
          cityId,
          areaId,
          address,
          businessScope,
          uniscId,
          clientName,
          clientType,
        } = data;

        const { contactName, contactMobile } = JSON.parse(mobile);

        setFieldsValue({
          contactName,
          contactMobile,
          selectAddress: [`${provId || ''}`, `${cityId || ''}`, `${areaId || ''}`].filter(
            (val) => val,
          ),
          address,
          businessScope,
          remark,
          uniscId,
          clientName,
          customerClassification: clientType || undefined, // 编辑无效 请忽略
        });
      })
      .finally(() =>
        this.setState({
          loading: false,
        }),
      );
  };

  handleSubmit = () => {
    const { match, history } = this.props;

    const {
      params: { id },
    } = match;

    const { validateFields } = this.formRef;

    validateFields()
      .then((values) => {
        const {
          contactName,
          contactMobile,
          selectAddress,
          address,
          businessScope,
          remark,
          uniscId,
          clientName,
          customerClassification,
        } = values;

        const [provId, cityId, areaId] = selectAddress || [];

        const params = {
          clientName: clientName || null,
          mobile: JSON.stringify({
            contactName,
            contactJobTitle: '前端',
            contactMobile,
          }),
          provId: provId || 0,
          cityId: cityId || 0,
          areaId: areaId || 0,
          address: address || null,
          businessScope: businessScope || null,
          remark: remark || null,
          uniscId: uniscId || null,
          clientType: customerClassification || null,
        };

        this.setState({
          loading: true,
        });

        if (id) {
          params.id = id;
          updateClient(params)
            .then(() => {
              this.setState({
                loading: false,
              });

              this.handleReset();
              goBackList(history);
            })
            .catch(() => {
              this.setState({
                loading: false,
              });
            });
        } else {
          addClient(params)
            .then(() => {
              this.setState({
                loading: false,
              });
              this.handleReset();

              goBackList(history);
            })
            .catch(() => {
              this.setState({
                loading: false,
              });
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  bindRef = (ref) => {
    this.formRef = ref;
  };

  render() {
    const { loading } = this.state;
    const { match } = this.props;

    const {
      params: { id },
    } = match;

    return (
      <Spin spinning={loading}>
        <Card
          title={`${id ? '新增' : '编辑'}-客户`}
          extra={
            <>
              <ReturnArrowLeftButton />
              <SaveButton onClick={this.handleSubmit} />
            </>
          }
        >
          <Form ref={this.bindRef} {...DEFAULT_FORM_ITEM_LAYOUT}>
            <Row gutter={32}>
              <Col span={8}>
                <InputItem
                  label="联系人"
                  field="contactName"
                  rules={[
                    {
                      required: true,
                      message: '请填写联系人',
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <PhoneItem required label="手机号" field="contactMobile" />
              </Col>
              <Col span={8}>
                <DepartmentItem label="客户分类" field="customerClassification" />
              </Col>
              <Col span={8}>
                <InputItem
                  label="公司名称"
                  field="clientName"
                  rules={[
                    {
                      required: true,
                      message: '请填写公司名称',
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <RegionItem label="地区" field="selectAddress" />
              </Col>
              <Col span={8}>
                <InputItem label="详细地址" field="address" placeholder="请填写详细地址" />
              </Col>
              <Col span={8}>
                <InputItem label="经营范围" field="businessScope" placeholder="请填写经营范围" />
              </Col>
              <Col span={8}>
                <InputItem label="税号" field="uniscId" placeholder="请填写税号" />
              </Col>
              <Col span={24}>
                <TextAreaItem
                  label="备注"
                  field="remark"
                  placeholder="如有备注请填写"
                  labelCol={{
                    span: 2,
                  }}
                  wrapperCol={{
                    span: 22,
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </Spin>
    );
  }
}

export default ClientEditorAndAdd;
