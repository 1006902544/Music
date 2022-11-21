import React from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Layout.less';

const Layout = (): React.ReactElement => {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <div className='layout-container'>
      <TransitionGroup>
        <CSSTransition timeout={300} classNames='layout-animation' key={location.pathname} unmountOnExit mountOnEnter>
          {outlet}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Layout;