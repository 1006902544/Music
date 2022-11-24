import axios from 'axios';
import env from '@/config/env';
import useMessage from '@/hooks/useMessage/useMessage';
import tokenHandle from '@/utils/token';

const message = useMessage();

const instance = axios.create({
  baseURL: env(),
  timeout: 5000
});

instance.interceptors.request.use((config) => {
  const token = tokenHandle.getToken();
  if (token) {
    config.headers ? config.headers.authorization = `Bearer ${token}` : null;
  }
  return config;
});

instance.interceptors.response.use((config) => {
  const { data } = config;
  if (data.code !== 200) message(data.msg, 'warn');
  return config;
}, (err) => {
  console.log(err);
});

export default instance;