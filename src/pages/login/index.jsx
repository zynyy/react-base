import InputItem from '@/components/form-item/input';
import PasswordItem from '@/components/form-item/input/password';
import { accountLogin } from '@/services/login';
import {
  AUTO_LOGIN_KEY,
  LOGIN_INFO_STORAGE_KEY,
  REMEMBER_PASSWORD_KEY,
  REMEMBER_USER_KEY,
} from '@/utils/define';
import { decryptAES, encryptAES } from '@/utils/encryption';
import {
  AlipayCircleOutlined,
  LockTwoTone,
  QqOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Row, Spin } from 'antd';
import qs from 'qs';
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import store from 'store2';
import './style/index.less';

const Login = ({ history }) => {
  const [form] = Form.useForm();
  const [autoLogin, setAutoLogin] = useState(() => {
    return store.get(AUTO_LOGIN_KEY) ?? false;
  });
  const [rememberPassword, setRememberPassword] = useState(() => {
    return store.get(REMEMBER_PASSWORD_KEY) ?? false;
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const { validateFields } = form;

    validateFields()
      .then((formValues) => {
        const { username, password } = formValues;
        setLoading(true);

        const params = {
          username,
          password,
        };

        accountLogin(params)
          .then((res) => {
            const { data } = res;
            store.set(LOGIN_INFO_STORAGE_KEY, data);
            store.set(AUTO_LOGIN_KEY, autoLogin);
            store.set(REMEMBER_PASSWORD_KEY, rememberPassword);
            if (rememberPassword) {
              store.set(REMEMBER_USER_KEY, encryptAES(qs.stringify(params)));
            } else {
              store.remove(REMEMBER_USER_KEY);
            }
          })
          .finally(() => {
            history.push('/form-item');
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

    if (!checked) {
      setAutoLogin(false);
    }
    setRememberPassword(checked);
  };

  const initialValues = useMemo(() => {
    const paw = store.get(REMEMBER_USER_KEY);
    if (paw) {
      return qs.parse(decryptAES(paw));
    }
    return {};
  }, []);

  return (
    <Spin spinning={loading}>
      <Helmet>
        <title>登陆页面</title>
      </Helmet>

      <div className="main">
        <div className="login">
          <Form form={form} initialValues={initialValues}>
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
