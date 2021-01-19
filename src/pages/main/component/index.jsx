import { Col, Form, Row } from 'antd';
import React from 'react';
import CheckboxWidget from './widget/checkbox';
import DatePickerWidget from './widget/date-picker';
import InputWidget from './widget/input';
import InputNumberWidget from './widget/input-number';

const Component = () => (
  <Form>
    <Row gutter={[8, 10]}>
      <Col span={8}>
        <InputWidget />
      </Col>
      <Col span={8}>
        <InputNumberWidget />
      </Col>
      <Col span={8}>
        <CheckboxWidget />
      </Col>
      <Col span={8}>
        <DatePickerWidget />
      </Col>
    </Row>
  </Form>
);

export default Component;
