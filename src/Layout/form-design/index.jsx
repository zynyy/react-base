import React from 'react';
import { Layout } from 'antd';
import FormDesignHeader from '@/Layout/Header/form-design-header';
import FormDesignContent from '@/Layout/Content/form-design';
import FormDesignLeftSider from '@/Layout/Sider/form-design-left-sider';
import FormDesignRightSider from '@/Layout/Sider/form-design-right-sider';

import './style/index.less';

const { Footer } = Layout;

const FormDesignLayout = () => {
  return (
    <Layout id="form-design-layout">
      <FormDesignHeader />
      <Layout>
        <FormDesignLeftSider />
        <FormDesignContent />
        <FormDesignRightSider />
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default FormDesignLayout;
