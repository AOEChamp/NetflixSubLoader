import WebVTTParser from "./WebVTTParser";

const getFirstLine = (text) => {
  const index = text.indexOf("\n");
  if (index === -1) return "";
  return text.substring(0, index);
};

export const getData = async (file) => {
  const data = await new Response(file).text();
  return data;
};

export const parseSubtitle = (data) => {
  const firstLine = getFirstLine(data);
  if (firstLine.includes("WEBVTT")) {
    return WebVTTParser.parse(data);
  }
};
