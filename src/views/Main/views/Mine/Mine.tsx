import React, { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { useAppSelector } from '@/store/hooks';
import Img from '@/components/Img/Img';
import Dialog from '@/components/Dialog/Dialog';
import UserOptions from '@/components/UserOptions/UserOptions';
import './Mine.less';

type optionType = 'articles' | 'comments' | 'fans' | 'concerns'

const Mine = (): React.ReactElement => {
  const user = useAppSelector(state => state.userReducer.user);
  const [showDialog, setShowDialog] = useState(false);
  const [optionType, setOptionType] = useState<optionType>('articles');

  const openOption: MouseEventHandler = (e) => {
    const type = (e.target as HTMLElement).dataset.type;
    if (type) {
      setOptionType(type as optionType);
      setShowDialog(true);
    }
  };

  return (
    <div className="mine-container">
      <div className="mine-unlogin" style={{ display: user ? 'none' : undefined }}>
        请登录后查看个人信息 0.o
      </div>

      <div className="mine-card" style={{ display: user ? undefined : 'none' }}>
        <div className="mine-card-avatar">
          <Img src={user?.avatar} />
        </div>

        <div className="mine-card-name">
          {user?.name}
        </div>

        <div className="mine-card-sex">
          <i className={`iconfont icon-${user?.sex === 0 ? 'michi' : user?.sex === 1 ? 'nan1' : 'nv1'}`}></i>
        </div>
      </div>


      <div className="mine-edit" style={{ display: user ? undefined : 'none' }}>
        编辑
      </div>

      <div className="mine-options" onClick={openOption} style={{ display: user ? undefined : 'none' }}>
        <div className="mine-articles" data-type="articles">
          <i className="iconfont icon-svgwrite" data-type="articles"></i>
          <span data-type="articles">{user?.art_count}</span>
        </div>

        <div className="mine-comments" data-type="comments">
          <i className="iconfont icon-comment" data-type="comments"></i>
          <span data-type="comments">{user?.com_count}</span>
        </div>

        <div className="mine-fans" data-type="fans">
          <i className="iconfont icon-fensishu" data-type="fans"></i>
          <span data-type="fans">{user?.fans_count}</span>
        </div>

        <div className="mine-concerns" data-type="concerns">
          <i className="iconfont icon-x_guanzhu" data-type="concerns"></i>
          <span data-type="concerns">{user?.concern_count}</span>
        </div>
      </div>

      <div className="mine-time" style={{ display: user ? undefined : 'none' }}>
        您于{user ? Math.floor((Date.now() - user?.create_time) / (24 * 3600 * 1000)) : 0}天前注册
      </div>


      <Dialog show={showDialog} El={<UserOptions show={showDialog} type={optionType} />} click={() => setShowDialog(false)} stop />
    </div>
  );
};

export default Mine;