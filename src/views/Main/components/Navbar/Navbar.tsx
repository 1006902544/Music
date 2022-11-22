import React, { useRef, useState, useEffect } from 'react';
import type { TouchEventHandler } from 'react';
import * as type from '../../Main.d';
import './Navbar.less';

interface IProps {
  navbar: type.navbar
  setNavbar: React.Dispatch<React.SetStateAction<type.navbar>>
}

const Navbar = (props: IProps): React.ReactElement => {
  const { navbar, setNavbar } = props;
  const navbarContainerRef = useRef(null);
  const valueRef = useRef(null);

  const startPointX = useRef(0);
  const [transformX, setTransformX] = useState<number>(0);

  //触摸
  const handleTouchStart: TouchEventHandler = (e) => {
    startPointX.current = e.targetTouches[0].clientX;
    document.addEventListener("touchmove", handleTouchMove as () => void);
  };

  //拖拽
  const handleTouchMove: TouchEventHandler = (e) => {
    const x = e.targetTouches[0].clientX - startPointX.current;
    setTransformX((x / document.body.offsetWidth) * 100 * 2);
    document.addEventListener("touchend", handleTouchEnd as () => void);
  };

  //拖拽结束
  const handleTouchEnd: TouchEventHandler = (e) => {
    const percent = ((e.changedTouches[0].clientX - startPointX.current) / document.body.offsetWidth);
    if (percent > 0.33 || percent < -0.33) {
      changeNavbar(percent);
    }
    setTransformX(0);
    document.removeEventListener("touchmove", handleTouchMove as () => void);
    document.removeEventListener("touchend", handleTouchEnd as () => void);
  };

  //处理切换
  const changeNavbar = (percent: number) => {
    const nowId = navbar.filter(item => item.chose)[0].id;
    if (percent > 0) {
      nowId === 1 ?
        showBorder() :
        setNavbar(navbar.map(item => {
          const obj = item;
          obj.chose = item.id === nowId - 1 ? true : false;
          return obj;
        }));
    } else if (percent < 0) {
      nowId === navbar.length ?
        showBorder() :
        setNavbar(navbar.map(item => {
          const obj = item;
          obj.chose = item.id === nowId + 1 ? true : false;
          return obj;
        }));
    }
  };

  //到达边界显示效果
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const showBorder = () => {
    setIsBorder(true);
    timer.current = setTimeout(() => {
      setIsBorder(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current as NodeJS.Timeout);
      timer.current = null;
    };
  }, []);

  return (
    <div className="main-navbar-component">
      <div className="main-navbar-container"
        style={{
          width: navbar.length * 100 + '%',
          transform: `translateX(-${((1 / navbar.length) * 100) * navbar.findIndex(item => item.chose)}%)`
        }}
        ref={navbarContainerRef}>

        <div className={["main-navbar-border-left", isBorder ? "main-navbar-border-active" : null].join(' ')}></div>

        {
          navbar.map(item => (
            <div
              className="main-navbar-item"
              key={item.id}
              style={{ width: (1 / navbar.length) * 100 + '%' }}
              onTouchStart={handleTouchStart}
            >
              <span ref={valueRef} style={{ transform: `translate(${transformX}%)`, transition: transformX === 0 ? 'all 0.3s' : undefined }}>{item.value}</span>
            </div>
          ))
        }

        <div className={["main-navbar-border-right", isBorder ? "main-navbar-border-active" : null].join(' ')}></div>
      </div>
    </div>
  );
};

export default Navbar;