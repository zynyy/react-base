import React from 'react';
import { Layout } from 'antd';

import { AntDesignOutlined, PlusOutlined } from '@ant-design/icons';

import ReactLogoIcon from '@/components/Icon/react-logo';
import FLogoIcon from '@/components/Icon/f-logo';

import './style/index.less';

const { Header } = Layout;

const FormDesignHeader = () => {
  return (
    <Header id="form-design-header">
      <ReactLogoIcon className="logo" />
      <PlusOutlined className="logo-plus" />
      <AntDesignOutlined className="logo" />
      <PlusOutlined className="logo-plus" />
      <FLogoIcon className="logo" />
      表单设计
    </Header>
  );
};

export default FormDesignHeader;
