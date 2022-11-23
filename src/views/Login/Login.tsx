import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoginCom from './components/LoginCom/LoginCom';
import EnrollCom from './components/EnrollCom/EnrollCom';
import './Login.less';

const Login = (props: unknown): React.ReactElement => {
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
          <CSSTransition classNames="login-com-animation" timeout={300} key={nowCom} unmountOnExit component={<div />}>
            {
              props ?
                <>
                  <LoginCom nowCom={nowCom} />
                  <EnrollCom nowCom={nowCom} /></> :
                null
            }
          </CSSTransition>
        </TransitionGroup>
      </div>

      <button onClick={() => { setNowCom(nowCom === 'login' ? 'enroll' : 'login'); }}>asdas</button>
    </div>
  );
};

export default Login;