import axios from 'axios';
import env from '@/config/env';

const instance = axios.create({
  baseURL: env(),
  timeout: 5000
});

export default instance;