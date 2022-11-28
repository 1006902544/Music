import React, { useState, useEffect, useRef } from 'react';
import { getArticles as getArtsReq } from '@/api/article/article';
import ArticleList from '@/components/ArticleList/ArticleList';
import FreshingSign from '@/components/FreshingSign/FreshingSign';
import { CSSTransition } from 'react-transition-group';
import './Square.less';

const Square = (): React.ReactElement => {
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const [lists, setLists] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);

  //是否处于刷新
  const [freshing, setFreshing] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const initPullDown = () => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (getArtsRef.current) getArtsRef.current();
      }
    }, {
      root: contentRef.current,
      threshold: [0.9],
      rootMargin: '0px'
    });
    if (bottomRef.current) observerRef.current.observe(bottomRef.current);
  };

  const getArtsRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    initPullDown();
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  //实时更新getArticles函数用于滚动处理
  useEffect(() => {
    getArtsRef.current = getMoreArticles;
  });

  //获取文章并合并
  const getMoreArticles = async () => {
    if (freshing || isLastPage) return;
    setFreshing(true);
    const { data } = await getArtsReq(limit, page);
    if (data.code === 200) {
      setLists(lists.concat(data.articles));
      setIsLastPage(data.isLastPage);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setFreshing(false);
  }, [page]);

  //滚动到顶部
  const goTop = () => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  //刷新
  const refresh = async () => {
    setFreshing(true);
    const { data } = await getArtsReq(limit, 1);
    if (data.code === 200) {
      setLists(data.articles);
      setIsLastPage(data.isLastPage);
      setPage(2);
      goTop();
      if (page === 2) setFreshing(false);
    }
  };

  return (
    <div className="square-container">
      <div className="square-content" ref={contentRef}>
        {
          lists.map((list: global.article) => (
            <CSSTransition timeout={500} classNames="article-list-animation" key={list.aid} in={true} appear>
              <ArticleList article={list} />
            </CSSTransition>
          ))
        }

        <div className="square-content-bottom" ref={bottomRef}>
          {isLastPage ?
            <span><i className="iconfont icon-wode"></i> 已经是最后一页了~</span>
            : ''}
        </div>
      </div>

      <div className="freshing-container">
        <div className="freshing-container-gotop" onClick={goTop} style={{ display: page > 2 ? undefined : 'none' }}>
          <i className="iconfont icon-fangxiang-xiangshang"></i>
        </div>
        <div className="freshing-container-refresh" onClick={refresh}>
          <i className="iconfont icon-shuaxin"></i>
        </div>

        <FreshingSign show={freshing} />
      </div>
    </div>
  );
};

export default Square;