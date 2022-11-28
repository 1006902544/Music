import request from '@/request/request';
import * as type from './user.d';

//获取用户本人信息
export const getUserDetail = () => request.get('/user/self');

//注册
export const enroll = (data: type.IEnroll) => request.post('/user/enroll', data);

//登录
export const login = (data: type.ILogin) => request.post('/user/login', data);

//获取用户粉丝
export const getUserFans = (uid: string, limit: number, page: number) =>
  request.get(`/user/fans?uid=${uid}&limit=${limit}&page=${page}`);

//获取用户关注
export const getUserConcerns = (uid: string, limit: number, page: number) =>
  request.get(`/user/concern?uid=${uid}&limit=${limit}&page=${page}`);