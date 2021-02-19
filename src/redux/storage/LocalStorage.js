const KEY_PREFIX = "NSL-";

export const loadObject = (key) => {
  try {
    const jsonObj = localStorage.getItem(KEY_PREFIX + key);
    if (jsonObj === null) {
      return undefined;
    }
    return JSON.parse(jsonObj);
  } catch (_e) {
    return undefined;
  }
};

export const saveObject = (key, value) => {
  try {
    const jsonObj = JSON.stringify(value);
    localStorage.setItem(KEY_PREFIX + key, jsonObj);
  } catch {
    console.log("Error saving obj to localStorage");
  }
};
