import { fromSrt } from "subtitles-parser";

const parse = (data) => {
  let subs = fromSrt(data, true);
  subs = subs.map((cue) => [cue.startTime, cue.endTime, cue.text]);
  return subs;
};

export default {
  parse,
};
