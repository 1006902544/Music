import React from 'react';
import './Header.less';

const MainHeader = (): React.ReactElement => {

  return (
    <div className="main-header-component">
      <div className="main-header-name">username</div>
      <div className="main-header-login">去登陆 ＞</div>
    </div>
  );
};

export default MainHeader;