import React, { useState } from 'react';
import { Button, Col, Form, Row, Spin, Checkbox } from 'antd';
import {
  LockTwoTone,
  UserOutlined,
  AlipayCircleOutlined,
  QqOutlined,
  WeiboCircleOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';

import InputItem from '@/components/form-item/input';
import PasswordItem from '@/components/form-item/input/password';
import './style/index.less';

import { accountLogin } from '@/services/login';

const Login = () => {
  const [form] = Form.useForm();
  const [autoLogin, setAutoLogin] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const { validateFields } = form;

    validateFields()
      .then((formValues) => {
        const { username, password } = formValues;
        setLoading(true);
        accountLogin({
          username,
          password,
        })
          .then()
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAutoLoginChange = (e) => {
    const { checked } = e.target;
    setAutoLogin(checked);
    if (!rememberPassword && checked) {
      setRememberPassword(true);
    }
  };

  const handleRememberPasswordChange = (e) => {
    const { checked } = e.target;
    setRememberPassword(checked);
  };

  return (
    <Spin spinning={loading}>
      <Helmet>
        <title>登陆页面</title>
      </Helmet>

      <div className="main">
        <div className="login">
          <Form
            form={form}
            initialValues={{
              username: 'hyl',
              password: '123456',
            }}
          >
            <Row type="flex">
              <Col span={24}>
                <InputItem
                  field="username"
                  prefix={
                    <UserOutlined
                      style={{
                        color: '#1890ff',
                      }}
                      className="prefixIcon"
                    />
                  }
                  placeholder="请输入用户名"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
              </Col>
              <Col span={24}>
                <PasswordItem
                  field="password"
                  prefix={<LockTwoTone className="prefixIcon" />}
                  placeholder="请输入密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </Col>

              <Col className="btn">
                <Checkbox checked={autoLogin} onChange={handleAutoLoginChange}>
                  自动登陆
                </Checkbox>
                <Checkbox checked={rememberPassword} onChange={handleRememberPasswordChange}>
                  记住密码
                </Checkbox>
                <Button type="link">忘记密码</Button>
              </Col>

              <Col span={24}>
                <Button type="primary" onClick={handleSubmit} className="submit">
                  登陆
                </Button>
              </Col>
            </Row>
            <div className="other">
              其他登录方式
              <AlipayCircleOutlined className="icon" />
              <WeiboCircleOutlined className="icon" />
              <QqOutlined className="icon" />
              <WechatOutlined className="icon" />
              <Link className="register" to="/register">
                注册账户
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
