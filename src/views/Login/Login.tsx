import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginCom from './components/LoginCom/LoginCom';
import EnrollCom from './components/EnrollCom/EnrollCom';
import './Login.less';

const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/');
  };

  const [nowCom, setNowCom] = useState<'login' | 'enroll'>('login');

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="go-main" onClick={goMain}>主页</div>

        <TransitionGroup>
          <CSSTransition classNames={`${nowCom}-com-animation`} timeout={300} key={nowCom} unmountOnExit mountOnEnter>
            {
              nowCom === 'login' ?
                <LoginCom /> :
                <EnrollCom setNowCom={setNowCom} />
            }
          </CSSTransition>
        </TransitionGroup>

        {
          nowCom === 'login' ?
            <div className="toggle-com" onClick={() => setNowCom('enroll')}>
              没有账号？<span>去注册</span>
            </div> :
            <div className="toggle-com" onClick={() => setNowCom('login')}>
              已有帐号？<span>去登陆</span>
            </div>
        }
      </div>
    </div>
  );
};

export default Login;