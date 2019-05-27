export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * ONE_HOUR;

export const getCurrentTime = (): number => {
  return new Date().getTime();
};

export const getTodayTime =  (): number => {
  return floorToDate(new Date());
};

export const floorToDate = (time: any): number => {
  const t = new Date(time);
  t.setHours(0, 0, 0, 0);
  return t.getTime();
};

export const floorToMinute = (time: any): number => {
  const t = new Date(time);
  t.setSeconds(0, 0);
  return t.getTime();
};

export const lessThanADay = (later: number, earlier: number = getCurrentTime()): boolean => {
  return later - earlier < ONE_DAY;
};
