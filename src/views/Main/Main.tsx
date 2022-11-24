import React, { useState, useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MainHeader from './components/Header/Header';
import MainNavbar from './components/Navbar/Navbar';
import * as type from './Main.d';
import { useAppSelector } from '@/store/hooks';
import type { user } from '@/store/user/userSlice';
import './Main.less';

const Main = (): React.ReactElement => {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const userStore = useAppSelector(state => state.userReducer.user);

  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    setUser(userStore);
  });

  const [navbar, setNavbar] = useState<type.navbar>([
    { id: 1, value: '广场', path: '/square', chose: true },
    { id: 2, value: '我的', path: '/mine', chose: false },
    { id: 3, value: '用户', path: '/user', chose: false },
    { id: 4, value: '商城', path: '/shop', chose: false },
    { id: 5, value: '购物车', path: '/cart', chose: false },
  ]);

  const [nowLocation, setNowLocation] = useState('/square');

  //navbar变化切换路由
  const changeRoute = () => {
    const path = navbar.filter(item => item.chose)[0].path;
    setNowLocation(path);
    navigate(navbar.filter(item => item.chose)[0].path);
  };

  useEffect(() => {
    handleDirection();
    changeRoute();
  }, [navbar]);

  const [direction, setDirection] = useState('right');

  //判断方向
  const handleDirection = () => {
    const curId = navbar.findIndex(item => item.chose) + 1;
    const preId = navbar.findIndex(item => item.path === nowLocation) + 1;
    setDirection(curId >= preId ? 'right' : 'left');
  };

  return (
    <div className="main-container">
      <MainHeader user={user} />

      <div className="main-content">
        <TransitionGroup>
          <CSSTransition timeout={300} classNames={`main-animation-${direction}`} key={nowLocation}>
            {outlet ? outlet : <div></div>}
          </CSSTransition>
        </TransitionGroup>
      </div>

      <MainNavbar navbar={navbar} setNavbar={setNavbar} />
    </div>
  );
};

export default Main;