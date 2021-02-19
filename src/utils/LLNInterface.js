export const getVideoTime = () => {
  return unsafeWindow.lln?.vidMan?.getRawTime() || 0;
};
