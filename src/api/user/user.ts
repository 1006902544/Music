import request from '@/request/request';
import * as type from './user.d';

//获取用户本人信息
export const getUserDetail = () => request.get('/user/self');

//注册
export const enroll = (data: type.IEnroll) => request.post('/user/enroll', data);

//登录
export const login = (data: type.ILogin) => request.post('/user/login', data);