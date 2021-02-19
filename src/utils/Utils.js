const TAG_REGEX = /(<([^>]+)>)/gi;

export const stripTags = (string) => string.replace(TAG_REGEX, "");
