import WebVTTParser from "./WebVTTParser";
import SRTParser from "./SRTParser";

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
  try {
    if (firstLine.includes("WEBVTT")) {
      return WebVTTParser.parse(data);
    } else {
      return SRTParser.parse(data);
    }
  } catch (e) {
    console.log("error parsing subtitles: " + e.message);
  }
  return null;
};
