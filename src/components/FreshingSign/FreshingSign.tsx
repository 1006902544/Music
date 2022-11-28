import React, { useEffect, useState, useRef } from 'react';
import './FreshingSign.less';

interface IProps {
  show: boolean
}

const FreshingSign = (props: IProps): React.ReactElement => {
  const { show } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
  const signRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const handleCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(0, 100);
      ctx.lineTo(300, 150);
      ctx.fillStyle = '#ff399c';
      ctx.fill();
    }
  };

  useEffect(() => {
    handleCanvas();
    return () => {
      if (unmountTimer.current) {
        clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }
      if (finishTimer.current) {
        clearTimeout(finishTimer.current);
        finishTimer.current = null;
      }
    };
  }, []);

  const finishTimer = useRef<NodeJS.Timeout | null>(null);
  const unmountTimer = useRef<NodeJS.Timeout | null>(null);

  const [status, setStatus] = useState<'show' | 'finish' | 'unmounting' | 'unmount'>('unmount');

  const clearAllTimeout = () => {
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    unmountTimer.current = finishTimer.current = null;
  };

  const handleUnshow = () => {
    if (show) {
      setStatus('show');
    } else if (!show) {
      setStatus('finish');
      finishTimer.current = setTimeout(() => {
        unmount();
      }, 1000);
    }
  };

  const unmount = () => {
    setStatus('unmounting');
    unmountTimer.current = setTimeout(() => {
      setStatus('unmount');
    }, 500);
  };

  useEffect(() => {
    clearAllTimeout();
    handleUnshow();
  }, [show]);

  return (
    <div className={`freshing-sign-com-${status}`}>
      <div className="freshing-sign" ref={signRef}>

        {status === 'finish' || status === 'unmounting' ?
          <i className="iconfont icon-zhengque"></i> :
          <i className="iconfont icon-shuaxin"></i>
        }
      </div>

      <canvas id="freshing-sign-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default FreshingSign;