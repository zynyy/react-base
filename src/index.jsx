import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HelmetProvider } from 'react-helmet-async';

import moment from 'moment';
import 'moment/locale/zh-cn';

import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
