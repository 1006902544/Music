import React, { useEffect, useRef, useState } from 'react';
import type { IProps } from './useMessage.d';
import { createRoot } from 'react-dom/client';
import './useMessage.less';

let wrap: HTMLElement | null = null;

const useMessage = () => {

  return (text: string, type: 'success' | 'failed' | 'warn' | 'none', timeout?: number) => {
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.style.cssText = `
        position:fixed;
        top:30px;
        right:0;
        z-index:100000;
        height:0;
        transition:all 0.3s;
        height:0;
      `;
      if (wrap) {
        document.body.appendChild(wrap);
      }
    }

    const divs = document.createElement('div');
    divs.style.cssText = `
      transition:all 0.3s;
    `;
    wrap.appendChild(divs);
    const root = createRoot(divs);
    wrap.style.height = wrap.childNodes.length * 93 + 'px';
    root.render(
      <Message
        rootDom={wrap}
        parentDom={divs}
        text={text}
        type={type}
        unmount={() => root.unmount()}
        timeout={timeout ? timeout : 2000}
      />
    );
  };
};

//message组件
const Message = (props: IProps): React.ReactElement => {
  const { rootDom, parentDom, text, unmount, timeout } = props;

  //卸载时间
  const unmountTimer = useRef<NodeJS.Timeout | null>(null);
  //退出动画时间
  const animationTimer = useRef<NodeJS.Timeout | null>(null);

  //初始化
  const initMessage = () => {
    unmountTimer.current = setTimeout(() => {
      handleUnmount();
    }, timeout);
    animationTimer.current = setTimeout(() => {
      setIsShow(false);
    }, (timeout / 5) >= 300 ? timeout - 300 : timeout - (timeout / 5));
  };

  //卸载组件
  const handleUnmount = () => {
    rootDom.removeChild(parentDom);
    unmount();
    rootDom.style.height = rootDom.childNodes.length * 93 + 'px';
  };

  //在卸载之前触发动画
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    initMessage();
    return () => {
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, []);

  return (
    <div
      className={isShow ? "message-item" : "message-item-out"}
      style={{ animationDuration: `${(timeout / 5) >= 300 ? 300 : timeout / 5}ms` }}
    >
      <div className="message-item-container">
        {text}
      </div>
    </div>
  );
};

export default useMessage;