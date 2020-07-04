import React from 'react';
import Icon from '@ant-design/icons';

import { ReactComponent as FLogoSvg } from '@/assets/img/f-logo.svg';

const FLogoIcon = (props) => {
  return <Icon {...props} component={FLogoSvg} />;
};

export default FLogoIcon;
