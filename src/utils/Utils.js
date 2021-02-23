import XXH from "xxhashjs";

const TAG_REGEX = /(<([^>]+)>)/gi;

export const stripTags = (string) => string.replace(TAG_REGEX, "");

export const hashFile = (data) => XXH.h32(data, 0).toString(16);

export const onUrlChange = (callback) => {
  const pushState = history.pushState;
  const replaceState = history.replaceState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    callback(arguments);
  };
  history.replaceState = function () {
    replaceState.apply(history, arguments);
    callback(arguments);
  };
};
