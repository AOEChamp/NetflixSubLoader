export const getVideoTime = () => {
  return unsafeWindow.lln?.vidMan?.getRawTime() || 0;
};

const MOVIE_REGEX = /watch\/(\d+)\??/;
export const getMovieId = () => {
  const match = MOVIE_REGEX.exec(window.location.href);
  return match?.[1] || 0;
};

export const pauseVideo = () => {
  unsafeWindow.lln?.vidMan?.pause();
};

export const getLLNSubs = () => {
  return unsafeWindow.lln?.subManager?.data?.subtitles || [];
};
