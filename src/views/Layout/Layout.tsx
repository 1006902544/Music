import React, { useState, useEffect } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Layout.less';

const Layout = (): React.ReactElement => {
  const outlet = useOutlet();
  const location = useLocation();
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setDirection('up');
        break;
      case '/login':
        setDirection('down');
        break;
      default:
        return;
    }
  }, [location]);

  return (
    <div className='layout-container'>
      <TransitionGroup>
        <CSSTransition timeout={300} classNames={`layout-animation-${direction}`} key={outlet?.props.children.props.children.key}>
          {outlet}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Layout;