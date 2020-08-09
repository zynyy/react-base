# 说明

## npm 仓库包镜像源地址

```js
// 官方源
npm config set registry https://registry.npmjs.org/
// 淘宝源
npm config set registry https://registry.npm.taobao.org/
```

## 一键更新检查包

```js
yarn upgrade-interactive --latest
or
npm install -g npm-check-updates
ncu // 检测包是否可以更新
ncu -u // 更新 package.json 版本包
yarn
```

## git commit 提交规范

```js
npm i -g gitmoji-cli
```

## webpack 包

1. `antd` React Ui 组件库 蚂蚁金服 出品
  github 地址: <https://github.com/ant-design/ant-design>, npm 地址 <https://www.npmjs.com/package/antd>,
  官网<https://ant.design/docs/react/introduce>

1. `axios` promise对象 HTTP 请求库 [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)是 es6的知识点。如果浏览器不支持 promise 可以添加 [es6-promise](https://www.npmjs.com/package/es6-promise) 包兼容。 js 原生请求有两个 `XMLHttpRequest(XHR)` 和 `fetch`

1. `classnames` 动态控制 HTML元素中的 class 属性值
  github 地址: <https://github.com/JedWatson/classnames>, npm 地址: <https://www.npmjs.com/package/classnames>

1. `moment` 时间处理库
  github 地址: <https://github.com/moment/moment>, npm 地址 <https://www.npmjs.com/package/moment>

1. `react-router-dom` 路由切换
  github 地址: <https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom>, npm 地址 <https://www.npmjs.com/package/react-router-dom>

1. `crypto-js` 加解密

## 开发工具依赖包

1. `eslint`: js 代码规范 <https://eslint.org/docs/rules/>
1. `stylelint`: CSS 代码规范 <https://stylelint.io/user-guide/rules/>
1. `prettier`: 代码格式化 <https://prettier.io/docs/en/index.html>
1. `pre-commit`: 只有通过代码规范检查才可以 git 提交到远程仓库
1. `cross-env`: 设置开发环境变量
1. `nodemon`: 检测文件变化
1. `npm-watch`: 监控文件变化重新启动
~~`craco-less` 是 `@craco/craco` 包开发的插件，主要是为了 css 的 less 预处理器。更多是为了修改 antd 包的主题~~
  github 地址: <https://github.com/FormAPI/craco-less>, npm 地址 <https://www.npmjs.com/package/craco-less>
~~`@craco/craco` 用来修改 create-react-app 脚手架  webpack 的配置
  github 地址: <https://github.com/sharegate/craco>, npm 地址: <https://www.npmjs.com/package/@craco/craco>~~
1. `webpack-bundle-analyzer` 打包之后的依赖关系图
~~`compression-webpack-plugin` 减少打包文件过大导致下载很慢 需要 nginx 的 gzip 模块配置~~
~~`uglifyjs-webpack-plugin`~~

## nginx 之 gzip 模块配置

查看是否开启了 gzip 只需看 请求头 的 `content-encoding`的值是不是 gzip

```nginx
// 动态压缩
<https://nginx.org/en/docs/http/ngx_http_gzip_module.html>
http {
  gzip on;
  gzip_min_length  1k;
  gzip_buffers     4 32k;
  gzip_http_version 1.1;
  gzip_comp_level 2;
  gzip_types       text/plain application/x-javascript text/css application/xml;
  gzip_vary on;
  gzip_disable "MSIE [1-6].";
}
// 静态压缩
<https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html#gzip_static>
http {
  gzip_static  on;
}

location / {
  try_files $uri $uri/ /index.html;
}
```

## 设置代理<https://create-react-app.dev/docs/proxying-api-requests-in-development>

在 `package.json` 中 添加 `"proxy": "www.domain.com"`
在 nginx 设置

```js
location /api {
  proxy_pass www.domain.com;
  proxy_set_header   X-Forwarded-Proto $scheme;
  proxy_set_header   X-Real-IP         $remote_addr;
}
```

在 `src` 目录下建 `setupProxy.js` 文件

```js
// https://github.com/chimurai/http-proxy-middleware#example
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.domain.com',
      changeOrigin: true,
    })
  );
};
```
