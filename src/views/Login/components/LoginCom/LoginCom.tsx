import React from 'react';
import './LoginCom.less';

interface IProps {
  nowCom: 'login' | 'enroll'
}

const LoginCom = (props: IProps): React.ReactElement | null => {
  const { nowCom } = props;

  return nowCom === 'login' ?
    (
      <div className="login-com" ></div>
    ) :
    (
      null
    );
};

export default LoginCom;