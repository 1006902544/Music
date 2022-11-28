import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { user } from '@/store/user/userSlice';
import './Header.less';

const MainHeader = (props: { user: user | null }): React.ReactElement => {
  const { user } = props;
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-header-component">
      <div className="main-header-name">{user ? user.name + ',欢迎回来' : null}</div>

      <div className="main-header-login" onClick={goLogin}>{
        user ? '注销' : '去登陆 >'
      }</div>
    </div>
  );
};

export default MainHeader;