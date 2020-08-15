import React from 'react';
import Icon from '@ant-design/icons';

import { ReactComponent as ReactLogoSvg } from '@/assets/img/react-logo.svg';

const ReactLogoIcon = (props) => {
  return <Icon {...props} component={ReactLogoSvg} />;
};

export default ReactLogoIcon;