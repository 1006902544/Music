import React from 'react';
import './UserOptFans.less';

interface IProps {
  fans: global.fans
}

const UserOptFans = (props: IProps): React.ReactElement => {
  const { fans } = props;

  return (
    <div className="user-opt-fans"></div>
  );
};

export default UserOptFans;