import ResetButton from '@/components/Button/reset';
import SearchButton from '@/components/Button/search';
import InputItem from '@/components/form-item/input';
import { Col, Form, Row } from 'antd';
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class SearchClientForm extends React.Component {
  bindRef = (ref) => {
    const { formRef } = this.props;

    formRef(ref);

    this.formRef = ref;
  };

  render() {
    const { onSearch } = this.props;
    return (
      <Form className="ant-advanced-search-form" ref={this.bindRef}>
        <Row gutter={16}>
          <Col span={4}>
            <InputItem label="公司名称" field="name" />
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              textAlign: 'right',
            }}
            span={24}
          >
            <SearchButton onClick={onSearch} />
            <ResetButton form={this.formRef} />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchClientForm;
