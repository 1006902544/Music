const handleTimeStamp = (value: number): string => {
  const date = new Date(value);
  const year = date.getFullYear();
  const mounth = date.getMonth() + 1;
  const day = date.getDay();
  const hour = date.getHours();
  const minite = date.getMinutes();

  return `${year}年${mounth}月${day}日${hour}时${minite}分`;
};

export default handleTimeStamp;