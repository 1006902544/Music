import React from 'react';
import './UserOptCon.less';

interface IProps {
  concern: global.concern
}

const UserOptCon = (props: IProps): React.ReactElement => {
  const { concern } = props;

  return (
    <div className="user-opt-con"></div>
  );
};

export default UserOptCon;