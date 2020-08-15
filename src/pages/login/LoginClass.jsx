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
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import store from 'store2';
import './style/index.less';

class LoginClass extends React.Component {
  constructor(props) {
    super(props);
    const paw = store.get(REMEMBER_USER_KEY);
    this.formRef = React.createRef();
    this.state = {
      autoLogin: store.get(AUTO_LOGIN_KEY) ?? false,
      rememberPassword: store.get(REMEMBER_PASSWORD_KEY) ?? false,
      loading: false,
      initialValues: paw ? qs.parse(decryptAES(paw)) : {},
    };
  }

  handleSubmit = () => {
    const { validateFields } = this.formRef.current;

    validateFields()
      .then((formValues) => {
        const { username, password } = formValues;

        const params = {
          username,
          password,
        };

        this.setState({
          loading: true,
        });

        accountLogin(params)
          .then((res) => {
            const { data } = res;
            const { autoLogin, rememberPassword } = this.state;

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
            this.setState({
              loading: false,
            });
            const { history } = this.props;
            history.push('/main-class');
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleAutoLoginChange = (e) => {
    const { checked } = e.target;
    const { rememberPassword } = this.state;

    this.setState({
      autoLogin: checked,
    });

    if (!rememberPassword && checked) {
      this.setState({
        rememberPassword: true,
      });
    }
  };

  handleRememberPasswordChange = (e) => {
    const { checked } = e.target;

    if (!checked) {
      this.setState({
        autoLogin: false,
      });
    }

    this.setState({
      rememberPassword: checked,
    });
  };

  render() {
    const { loading, initialValues, rememberPassword, autoLogin } = this.state;

    return (
      <Spin spinning={loading}>
        <Helmet>
          <title>class-登陆页面</title>
        </Helmet>

        <div className="main">
          <div className="login">
            <Form initialValues={initialValues} ref={this.formRef}>
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
                  <Checkbox checked={autoLogin} onChange={this.handleAutoLoginChange}>
                    自动登陆
                  </Checkbox>
                  <Checkbox checked={rememberPassword} onChange={this.handleRememberPasswordChange}>
                    记住密码
                  </Checkbox>
                  <Button type="link">忘记密码</Button>
                </Col>

                <Col span={24}>
                  <Button type="primary" onClick={this.handleSubmit} className="submit">
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
                <Link className="register" to="/login">
                  前往hooks
                  {/* 注册账户 */}
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Spin>
    );
  }
}

export default LoginClass;
