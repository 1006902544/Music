import React, { useState, useEffect, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import './Dialog.less';
import type * as type from './Dialog.d';

const Dialog = (props: type.IProps): React.ReactElement => {
  const { show, El, click, stop } = props;

  const [status, setStatus] = useState<'show' | 'unmounting' | 'unmounted'>('unmounted');
  const [firstLoad, setFirstLoad] = useState(true);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (show) {
      handleShow();
    } else {
      handleUnmount();
    }
    setFirstLoad(false);
  }, [show]);

  const handleShow = () => {
    setStatus('show');
  };

  const handleClick = () => {
    if (click) {
      click();
    }
  };

  const handleUnmount = () => {
    if (firstLoad) {
      setStatus('unmounted');
    } else {
      setStatus('unmounting');
      timer.current = setTimeout(() => {
        setStatus('unmounted');
      }, 300);
    }
  };

  const handleStop: MouseEventHandler = (e) => {
    if (stop) e.stopPropagation();
  };

  return (
    <div className={status === 'show' ?
      "dialog-container-show" :
      status === "unmounting" ?
        "dialog-container-unmounting" :
        "dialog-container-unmounted"}
      onClick={handleClick}
      data-set="dialog-layout"
    >
      <div onClick={handleStop}>
        {El}
      </div>
    </div>
  );
};


Dialog.defaultProps = {
  show: false
};

export default Dialog;