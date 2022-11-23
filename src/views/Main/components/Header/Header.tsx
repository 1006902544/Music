import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.less';

const MainHeader = (): React.ReactElement => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-header-component">
      <div className="main-header-name">username</div>
      <div className="main-header-login" onClick={goLogin}>去登陆 ＞</div>
    </div>
  );
};

export default MainHeader;