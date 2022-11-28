import React from 'react';
import timeStamp from '@/utils/timeStamp';
import Img from '@/components/Img/Img';
import './ArticleList.less';

interface IProps {
  article: global.article
}

const ArticleList = (props: IProps): React.ReactElement => {
  const { article } = props;

  return (
    <div className={`article-list-${article.images.length}`}>
      <div className={`article-auth`}>
        <span>{article.from.name}</span><i> :</i>
      </div>

      <div className="article-title">
        {article.title}
      </div>

      <div className="article-img">
        {
          article.images.map((img, i) => (
            <div className="article-img-item" key={i}>
              <Img src={img} />
            </div>
          ))
        }
      </div>

      <div className="article-info">
        <div className="article-time">{timeStamp(article.publish_time)}</div>

        <div className="article-like">{article.likes_count < 10000 ? article.likes_count : article.likes_count / 10000 + '万'}</div>
        <em></em>
      </div>
    </div>
  );
};

export default ArticleList;