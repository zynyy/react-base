import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Col, Form, Row, Card } from 'antd';
import InputItem from '@/components/form-item/input';
import PasswordItem from '@/components/form-item/input/password';
import InputNumberItem from '@/components/form-item/input-number';
import CompactInputNumberItem from '@/components/form-item/input-number/compact';

const FormItems = () => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Helmet>
        <title>form-item组件总览</title>
      </Helmet>

      <Form>
        <Row>
          <Col span={6}>
            <Card title="输入框">
              <InputItem field="input" />
              <PasswordItem field="password" />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="数字输入框">
              <InputNumberItem field="inputNumber" />
              <CompactInputNumberItem field="compactInputNumber" addAfter="金额" addBefore="元" />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormItems;
