import React, { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import Input from '@/components/Input/Input';
import type { IAllowed } from '@/components/Input/Input';
import useMessage from '@/hooks/useMessage/useMessage';
import * as exp from '@/utils/regExp';
import { enroll } from '@/api/user/user';
import { debounce } from 'lodash';
import './EnrollCom.less';

const EnrollCom = (props: { setNowCom: React.Dispatch<React.SetStateAction<"login" | "enroll">> }): React.ReactElement | null => {
  const { setNowCom } = props;
  const message = useMessage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ensurePsw, setEnsurePsw] = useState('');
  const [name, setName] = useState('');

  const usernameRef = useRef<IAllowed>(null);
  const passwordRef = useRef<IAllowed>(null);
  const ensurePswRef = useRef<IAllowed>(null);
  const nameRef = useRef<IAllowed>(null);

  //提交
  const submit = debounce(async () => {
    if (usernameRef.current && passwordRef.current && ensurePswRef.current && nameRef.current) {
      if (!usernameRef.current.isAllowed) return message(usernameRef.current.warnText, 'warn');
      if (!passwordRef.current.isAllowed) return message(passwordRef.current.warnText, 'warn');
      if (!ensurePswRef.current.isAllowed) return message(ensurePswRef.current.warnText, 'warn');
      if (!nameRef.current.isAllowed) return message(nameRef.current.warnText, 'warn');
      const { data } = await enroll({ username, password, name });

      if (data.code === 200) {
        setNowCom('login');
        message(data.msg, 'none');
      }
    }
  }, 200);

  return (
    <div className="enroll-com">
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
        ref={passwordRef}
        type="password"
      />
      <Input
        label='确认密码'
        value={ensurePsw}
        rules={[
          { rule: exp.passwordExp, text: '确认密码应为6~16位常规字符' },
          { rule: password == ensurePsw, text: '确认密码与密码不一致' }]}
        change={(e: ChangeEvent<HTMLInputElement>) => setEnsurePsw(e.target.value)}
        ref={ensurePswRef}
        type="password"
      />
      <Input
        label='昵称'
        value={name}
        rules={[{ rule: exp.nameExp, text: '昵称应为1~12位任意字符' }]}
        change={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        ref={nameRef}
      />

      <button onClick={submit}>注册</button>
    </div>
  );
};

export default EnrollCom;