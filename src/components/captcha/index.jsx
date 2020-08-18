import { captchaFetch } from '@/services/login';
import { Button, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

const CaptchaImg = ({ refresh }) => {
  const [src, setSrc] = useState('');

  const fetchData = useCallback(() => {
    captchaFetch()
      .then((res) => {
        const { data } = res;
        setSrc(data);
      })
      .catch(() => {
        setSrc(undefined);
        message.error('请重新点击获取验证码');
      });
  }, []);

  const handleClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  return (
    <Button type="link" onClick={handleClick} style={{ padding: 0 }}>
      <img src={src} alt="验证码" />
    </Button>
  );
};

export default CaptchaImg;
