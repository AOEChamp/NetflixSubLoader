import { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getVideoTime } from "../utils/LLNInterface";

const SUB_HIDE_DELAY = 125;

const findNextSubIndex = (time, index, subtitles) => {
  while (time > subtitles[index][0] && time > subtitles[index][1]) {
    index++;
  }
  return index;
};

const SubtitleDisplay = ({ selectedSub, alignment }) => {
  const alignmentRef = useRef(alignment);
  const requestRef = useRef();
  const isSubDisplayedRef = useRef(false);
  const subIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const currentSubtitlesRef = useRef(selectedSub);

  const [showSubtitles, setShowSubtitles] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");

  const animationFrame = () => {
    requestRef.current = requestAnimationFrame(animationFrame);

    const currentSubtitles = currentSubtitlesRef.current;

    if (!currentSubtitles?.data) {
      return;
    }

    const lastTime = lastTimeRef.current + alignmentRef.current;
    const curTimeRaw = getVideoTime();
    const curTime = curTimeRaw + alignmentRef.current;
    let shouldDisplaySub = isSubDisplayedRef.current;
    let newSubIndex = subIndexRef.current;
    let currentSub = currentSubtitles.data[newSubIndex];

    // Calculate new values
    if (curTime < lastTime) {
      newSubIndex = 0;
      shouldDisplaySub = false;
    }
    if (curTime - SUB_HIDE_DELAY > currentSub[1]) {
      shouldDisplaySub = false;
      newSubIndex = findNextSubIndex(
        curTime,
        newSubIndex,
        currentSubtitles.data
      );
      currentSub = currentSubtitles.data[newSubIndex];
    }
    if (curTime >= currentSub[0] && !isSubDisplayedRef.current) {
      shouldDisplaySub = true;
    }

    // Update state if changed
    if (shouldDisplaySub != isSubDisplayedRef.current) {
      setShowSubtitles(shouldDisplaySub);
    }
    if (newSubIndex != subIndexRef.current) {
      setSubtitleText(currentSub[2]);
    }

    // Update refs
    lastTimeRef.current = curTimeRaw;
    subIndexRef.current = newSubIndex;
    isSubDisplayedRef.current = shouldDisplaySub;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    currentSubtitlesRef.current = selectedSub;
    subIndexRef.current = 0;
  }, [selectedSub]);

  useEffect(() => {
    alignmentRef.current = alignment;
  }, [alignment]);

  return (
    <div id="lln-subs-injected">
      {showSubtitles && (
        <div class="lln-subs-wrap" style="font-size: 35.0545px;">
          <div class="lln-subs-font-adjust">
            <div style="font-size: 0.9em;">
              <div class="lln-subs-separator"></div>
              <div class="lln-whole-title-translation-wrap">
                <div class="lln-whole-title-translation">
                  <span class="translationText balance-text">
                    {subtitleText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedSub: state.subtitleList.selectedSub,
  alignment: state.movie.alignment,
});

export default connect(mapStateToProps)(SubtitleDisplay);
