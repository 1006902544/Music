import React, { useState, useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MainHeader from './components/Header/Header';
import MainNavbar from './components/Navbar/Navbar';
import * as type from './Main.d';
import './Main.less';

const Main = (): React.ReactElement => {
  const navigate = useNavigate();
  const outlet = useOutlet();

  const [navbar, setNavbar] = useState<type.navbar>([
    { id: 1, value: '广场', path: '/square', chose: true },
    { id: 2, value: '我的', path: '/mine', chose: false },
    { id: 3, value: '用户', path: '/user', chose: false },
    { id: 4, value: '商城', path: '/shop', chose: false },
    { id: 5, value: '购物车', path: '/cart', chose: false },
  ]);

  const [nowLocation, setNowLocation] = useState('/square');

  useEffect(() => {
    changeRoute();
  }, [navbar]);

  //navbar变化切换路由
  const changeRoute = () => {
    const path = navbar.filter(item => item.chose)[0].path;
    setNowLocation(path);
    navigate(navbar.filter(item => item.chose)[0].path);
  };

  return (
    <div className="main-container">
      <MainHeader />

      <div className="main-content">
        <TransitionGroup>
          <CSSTransition timeout={300} classNames="main-animation" key={nowLocation}>
            {outlet}
          </CSSTransition>
        </TransitionGroup>
      </div>

      <MainNavbar navbar={navbar} setNavbar={setNavbar} />
    </div>
  );
};

export default Main;