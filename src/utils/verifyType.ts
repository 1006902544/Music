export default (value: unknown) => {
  return Object.prototype.toString.call(value).split(' ')[1].split(']')[0];
};