const env = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'http://http://112.74.61.184:3000/api';
    case 'development':
      return 'http://192.168.2.104:3000/api';
    default:
      return 'http://localhost:3000/api';
  }
};

export default env;