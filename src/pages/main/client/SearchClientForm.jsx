import ResetButton from '@/components/Button/reset';
import SearchButton from '@/components/Button/search';
import InputItem from '@/components/form-item/input';
import { Col, Form, Row } from 'antd';
import React from 'react';

const SearchClientForm = ({ form, onSearch }) => {
  return (
    <Form className="ant-advanced-search-form" form={form}>
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
          <ResetButton form={form} />
        </Col>
      </Row>
    </Form>
  );
};

export default SearchClientForm;
