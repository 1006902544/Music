import React, { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import Input from '@/components/Input/Input';
import type { IAllowed } from '@/components/Input/Input';
import * as exp from '@/utils/regExp';
import { debounce } from 'lodash';
import useMessage from '@/hooks/useMessage/useMessage';
import { login } from '@/api/user/user';
import tokenHandle from '@/utils/token';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store/hooks';
import { getUserAction } from '@/store/user/userAsyncAction';
import './LoginCom.less';

const LoginCom = (): React.ReactElement | null => {
  const message = useMessage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameRef = useRef<IAllowed>(null);
  const passwordRef = useRef<IAllowed>(null);

  //提交
  const submit = debounce(async () => {
    if (usernameRef.current && passwordRef.current) {
      if (!usernameRef.current.isAllowed) return message(usernameRef.current.warnText, 'warn');
      if (!passwordRef.current.isAllowed) return message(passwordRef.current.warnText, 'warn');
      const { data } = await login({ username, password });
      if (data.code === 200) {
        tokenHandle.setToken(data.token);
        dispatch(getUserAction);
        message('登录成功', 'none');
        navigate('/');
      }
    }
  }, 200);

  return (
    <div className="login-com" >
      <Input
        label='用户名'
        value={username}
        rules={[{ rule: exp.usernameExp, text: '用户名应为6~16位常规字符' }]}
        change={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        ref={usernameRef}
      />

      <Input
        label='密码'
        value={password}
        rules={[{ rule: exp.passwordExp, text: '密码应为6~16位常规字符' }]}
        change={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        type="password"
        ref={passwordRef}
      />

      <button onClick={submit}>登录</button>
    </div>
  );
};

export default LoginCom;