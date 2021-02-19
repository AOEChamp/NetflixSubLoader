import { WebVTTParser } from "webvtt-parser";
import { stripTags } from "../utils/Utils";

const parse = (data) => {
  const parser = new WebVTTParser();
  const tree = parser.parse(data, "metadata");
  const subs = tree.cues.map((cue) => [
    cue.startTime * 1000,
    cue.endTime * 1000,
    stripTags(cue.text),
  ]);
  return subs;
};

export default {
  parse,
};
