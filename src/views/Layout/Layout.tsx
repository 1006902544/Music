import React, { useState, useEffect } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Layout.less';

const Layout = (): React.ReactElement => {
  const location = useLocation();
  const outlet = useOutlet();

  const [nowRoute, setNowRoute] = useState<string>('/');

  const routes = ['/', 'login'];

  const locationChange = () => {
    if (routes.some(route => route === location.pathname)) {
      setNowRoute(location.pathname);
    }
  };

  useEffect(() => {
    locationChange();
  }, [location]);

  return (
    <div className='layout-container'>
      <TransitionGroup>
        <CSSTransition timeout={300} classNames='layout-animation' key={nowRoute} unmountOnExit mountOnEnter>
          {outlet}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Layout;