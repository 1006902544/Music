import React from 'react';
import './UserOptCom.less';

interface IProps {
  comment: global.comment
}

const UserOptCom = (props: IProps): React.ReactElement => {
  const { comment } = props;

  return (
    <div className="user-opt-com"></div>
  );
};

export default UserOptCom;