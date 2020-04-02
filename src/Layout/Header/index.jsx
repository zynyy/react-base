import React from 'react';

import Icon, { AntDesignOutlined } from '@ant-design/icons';

import ReactLogo from '../../logo.svg';

const Header = () => {
  return (
    <>
      <AntDesignOutlined />

      <Icon component={<ReactLogo />} />
    </>
  );
};

export default Header;
