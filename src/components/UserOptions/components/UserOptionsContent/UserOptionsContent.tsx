import React, { useState, useEffect, useRef } from 'react';
import type { type } from '../../UserOptions.d';
import { getUserArticles } from '@/api/article/article';
import { getUserComments } from '@/api/comment/comment';
import { getUserFans, getUserConcerns } from '@/api/user/user';
import { useAppSelector } from '@/store/hooks';
import UserOptArt from '../UserOptArt/UserOptArt';
import UserOptCom from '../UserOptCom/UserOptCom';
import UserOptFans from '../UserOptFans/UserOptFans';
import UserOptCon from '../UserOptCon/UserOptCon';
import './UserOptionsContent.less';

interface IProps {
  type: type
  show: boolean
}

type list = global.article & global.comment & global.concern & global.fans

const UserOptionsContent = (props: IProps): React.ReactElement | null => {
  const { type, show } = props;
  const user = useAppSelector(state => state.userReducer.user);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [lists, setLists] = useState<Array<list>>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  //初始化底部感应器
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const initBottom = () => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) getListsRef.current();
    }, {
      root: contentRef.current,
      rootMargin: '0px',
      threshold: 1
    });
    if (bottomRef.current) observerRef.current.observe(bottomRef.current);
  };

  useEffect(() => {
    initBottom();
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!show) {
      setLists([]);
      setPage(1);
      setIsLastPage(false);
    }
  }, [show]);

  //获取列表
  const getLists = async () => {
    if (!user || !show || isLastPage) return;
    const data = await handleLists(type);
    if (data) {
      if (data.lists.length === 0 || data.lists.length < 10) {
        setIsLastPage(true);
      }
      setNowType(type);
      setLists(lists.concat(data.lists));
      setPage(page + 1);
    }
  };

  const handleLists = async (type: type) => {
    switch (type) {
      case 'articles': {
        const { data } = await getUserArticles(user!.uid, limit, page);
        return data.code === 200 ? { lists: data.articles, type } : null;
      }
      case 'comments': {
        const { data } = await getUserComments(user!.uid, limit, page);
        return data.code === 200 ? { lists: data.comments, type } : null;
      }
      case 'fans': {
        const { data } = await getUserFans(user!.uid, limit, page);
        return data.code === 200 ? { lists: data.fans, type } : null;
      }
      case 'concerns': {
        const { data } = await getUserConcerns(user!.uid, limit, page);
        return data.code === 200 ? { lists: data.concerns, type } : null;
      }
      default:
        return null;
    }
  };

  const getListsRef = useRef(getLists);
  useEffect(() => {
    getListsRef.current = getLists;
  });

  //列表直接根据type渲染会导致type改变后页面渲染改变了，但请求还在发送中，造成key错误的问题
  const [nowType, setNowType] = useState<type | null>(null);

  return <div className="user-options-dialog-content">
    {
      nowType === 'articles' ? lists.map(list => (
        <UserOptArt key={list.aid} article={list} />
      )) : null
    }
    {nowType === 'comments' ?
      lists.map(list => (
        <UserOptCom key={list.cid} comment={list} />
      )) : null
    }
    {
      nowType === 'fans' ?
        lists.map(list => (
          <UserOptFans key={list.uid} fans={list} />
        )) : null
    }
    {
      nowType === 'concerns' ?
        lists.map(list => (
          <UserOptCon key={list.uid} concern={list} />
        )) : null
    }

    <div className="user-options-bottom" ref={bottomRef}></div>
  </div>;
};

export default UserOptionsContent;