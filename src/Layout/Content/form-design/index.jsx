import React from 'react';
import { Layout } from 'antd';
import FormDesignContentHeader from '@/Layout/Header/form-design-content-header';

const { Content } = Layout;

const FormDesignContent = () => {
  return (
    <Layout>
      <FormDesignContentHeader />

      <Content>
        <span>从左侧拖拽或点击来添加字段</span>
      </Content>
    </Layout>
  );
};

export default FormDesignContent;
