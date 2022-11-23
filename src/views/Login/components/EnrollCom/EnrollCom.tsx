import React from 'react';
import './EnrollCom.less';


interface IProps {
  nowCom: 'login' | 'enroll'
}

const EnrollCom = (props: IProps): React.ReactElement | null => {
  const { nowCom } = props;

  return nowCom === 'enroll' ?
    (
      <div className="enroll-com" ></div>
    ) :
    (
      null
    );
};

export default EnrollCom;