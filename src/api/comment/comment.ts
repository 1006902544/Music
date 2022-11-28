import request from '@/request/request';

//获取用户评论列表
export const getUserComments = (uid: string, limit: number, page: number) => request.get(`/comment/user?uid=${uid}&limit=${limit}&page=${page}`);