import React, { useState } from 'react';
import './img.less';

import defaultImg from '@/static/images/default.png';

const Img = (props: { src: string | undefined }): React.ReactElement => {
  const { src } = props;
  const [err, setErr] = useState(false);

  const errFn = () => {
    setErr(true);
  };

  return (
    <img onError={errFn} src={err ? defaultImg : src} alt="" className="img-com" />
  );
};

export default Img;