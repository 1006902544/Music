import React from 'react';
import timeStamp from '@/utils/timeStamp';
import './UserOptArt.less';

interface IProps {
  article: global.article
}

const UserOptArt = (props: IProps): React.ReactElement => {
  const { article } = props;

  return (
    <div className="user-opt-art">
      <div className="user-opt-art-title">
        {article.title}
      </div>
      <div className="user-opt-art-info">
        <div className="user-opt-art-time">
          {timeStamp(article.publish_time)}
        </div>

        <div className="user-opt-art-like">
          {article.likes_count}
        </div>
      </div>
    </div>
  );
};

export default UserOptArt;