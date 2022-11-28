import request from '@/request/request';

//获取文章列表
export const getArticles = (limit = 10, page = 1) => request.get(`/article?limit=${limit}&page=${page}`);

//获取用户文章列表
export const getUserArticles = (uid: string, limit: number, page: number) =>
  request.get(`/article/user?uid=${uid}&limit=${limit}&page=${page}`);