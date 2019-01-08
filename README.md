# 说明

## webpack 包

1. `antd` React Ui 组件库 蚂蚁金服 出品
  github 地址: <https://github.com/ant-design/ant-design>, npm 地址 <https://www.npmjs.com/package/antd>,
  官网<https://ant.design/docs/react/introduce>

1. `axios` promise对象 HTTP 请求库 [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)是 es6的知识点。如果浏览器不支持 promise 可以添加 [es6-promise](https://www.npmjs.com/package/es6-promise) 包兼容。 js 原生请求有两个 `XMLHttpRequest(XHR)` 和 `fetch`

1. `classnames` 动态控制 HTML元素中的 class 属性值
  github 地址: <https://github.com/JedWatson/classnames>, npm 地址: <https://www.npmjs.com/package/classnames>

1. `moment` 时间处理库
  github 地址: <https://github.com/moment/moment>, npm 地址 <https://www.npmjs.com/package/moment>

1. `react-document-title` 动态的修改 HTML 文档 的标题
  github 地址: <https://github.com/gaearon/react-document-title>, npm 地址 <https://www.npmjs.com/package/react-document-title>

1. `react-router-dom` 路由切换
  github 地址: <https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom>, npm 地址 <https://www.npmjs.com/package/react-router-dom>

## 开发工具依赖包

1. `eslint`: js 代码规范
1. `pre-commit`: 只有通过代码规范检查才可以 git 提交到远程仓库
1. `cross-env`: 设置开发环境变量
1. `nodemon`: 检测文件变化
1. `prettier`: 代码格式化
1. `npm-watch`: 监控文件变化重新启动
1. `npm-check`: 检查项目包是否有需要更新的 github 地址<https://github.com/dylang/npm-check>
1. `craco-less` 是 `@craco/craco` 包开发的插件，主要是为了 css 的 less 预处理器。更多是为了修改 antd 包的主题
  github 地址: <https://github.com/FormAPI/craco-less>, npm 地址 <https://www.npmjs.com/package/craco-less>
1. `@craco/craco` 用来修改 create-react-app v2 即`react-scripts: ^2.0.0`版本以上 webpack 的配置
  github 地址: <https://github.com/sharegate/craco>, npm 地址: <https://www.npmjs.com/package/@craco/craco>
1. `webpack-bundle-analyzer` 打包之后的依赖关系图
1. `compression-webpack-plugin` 减少打包文件过大导致下载很慢 需要 nginx 的 gzip 模块配置
1. `uglifyjs-webpack-plugin`

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

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
