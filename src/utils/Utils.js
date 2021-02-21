import XXH from "xxhashjs";

const TAG_REGEX = /(<([^>]+)>)/gi;

export const stripTags = (string) => string.replace(TAG_REGEX, "");

export const hashFile = (data) => XXH.h32(data, 0).toString(16);
