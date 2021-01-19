import FormItem from '@/components/form-item';
import { isString } from '@/utils/is';
import { Checkbox, Col, Row } from 'antd';
import React from 'react';

const { Group } = Checkbox;

const CheckboxGroupItem = ({ field, label, rules, dataSource, ...restProps }) => (
  <FormItem field={field} label={label} rules={rules}>
    <Group
      {...restProps}
      style={{
        width: '100%',
      }}
    >
      <Row>
        {dataSource.map((item) => {
          if (isString(item)) {
            return (
              <Col span={6} key={item}>
                <Checkbox value={item} style={{ lineHeight: '32px' }}>
                  {item}
                </Checkbox>
              </Col>
            );
          }
          const { value, label: children, disabled } = item || {};
          return (
            <Col span={6} key={value}>
              <Checkbox value={value} disabled={disabled} style={{ lineHeight: '32px' }}>
                {children}
              </Checkbox>
            </Col>
          );
        })}
      </Row>
    </Group>
  </FormItem>
);

export default CheckboxGroupItem;
