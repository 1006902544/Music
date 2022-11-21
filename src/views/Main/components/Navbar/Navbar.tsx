import React from 'react';
import * as type from '../../Main.d';
import './Navbar.less';

interface IProps {
  navbar: type.navbar
  handleNavbar: (id: number) => void
}

const Navbar = (props: IProps): React.ReactElement => {
  const { navbar, handleNavbar } = props;

  return (
    <div className="main-navbar-component">
      {
        navbar.map(item => (
          <div className="main-navbar-item" key={item.id} onMouseDown={() => handleNavbar(item.id)}></div>
        ))
      }
    </div>
  );
};

export default Navbar;