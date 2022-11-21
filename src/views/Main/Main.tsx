import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import MainHeader from './components/Header/Header';
import MainNavbar from './components/Navbar/Navbar';
import * as type from './Main.d';
import './Main.less';

const Main = (): React.ReactElement => {
  const [navbar, setNavbar] = useState<type.navbar>([
    { id: 1, value: '广场', path: '/' },
    { id: 2, value: '我的', path: '/mine' },
    { id: 3, value: '用户', path: '/user' },
    { id: 4, value: '商城', path: '/shop' },
    { id: 5, value: '购物车', path: '/cart' },
  ]);

  //设置navbar显示状态
  const handleNavbar = (id: number) => {
    return;
  };

  return (
    <div className="main-container">
      <MainHeader />

      <div className="main-content"></div>

      <MainNavbar navbar={navbar} handleNavbar={handleNavbar} />
    </div>
  );
};

export default Main;