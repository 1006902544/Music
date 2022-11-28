import React, { useState, useEffect } from 'react';
import type * as type from './UserOptions.d';
import UserOptionsContent from './components/UserOptionsContent/UserOptionsContent';
import './UserOptions.less';

const UserOptions = (props: type.IProps): React.ReactElement => {
  const { show, type } = props;
  const [typeTxt, setTypeTxt] = useState('');

  useEffect(() => {
    switch (type) {
      case 'articles':
        setTypeTxt('用户文章');
        break;
      case 'comments':
        setTypeTxt('用户评论');
        break;
      case 'fans':
        setTypeTxt('用户粉丝');
        break;
      case 'concerns':
        setTypeTxt('用户关注');
        break;
      default:
        return;
    }
  }, [type]);

  return (
    <div className="user-options-dialog" style={{ animationName: show ? 'optionsIn' : 'optionsOut' }}>
      <div className="user-options-dialog-title">
        {typeTxt}
      </div>

      <UserOptionsContent type={type} show={show} />
    </div>
  );
};

export default UserOptions;