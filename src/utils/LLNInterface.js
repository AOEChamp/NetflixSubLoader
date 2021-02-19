export const getVideoTime = () => {
  return unsafeWindow.lln?.vidMan?.getRawTime() || 0;
};

export const getMovieId = () => {
  return unsafeWindow.lln?.subManager?.data?.mm?.movieId || 0;
};
