import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "./Dialog";
import { DIALOGS, hideDialog, setAlignment } from "../redux/actions";
import { getVideoTime, getLLNSubs } from "../utils/LLNInterface";

const AlignmentDialog = ({
  hidden,
  options,
  hideDialog,
  alignment,
  selectedSub,
  setAlignment,
}) => {
  const [nextSubIndex, setNextSubIndex] = useState(0);

  const onClose = () => {
    hideDialog(DIALOGS.ALIGNMENT_DIALOG);
  };

  const curTime = getVideoTime();
  const llnSubs = getLLNSubs();
  const ownSubs = selectedSub?.data || [];
  const nextLLNSub = llnSubs.find((sub) => sub.end >= curTime);
  const nextOwnSub = ownSubs[nextSubIndex];
  const nextAlignValue =
    nextOwnSub && nextLLNSub && nextOwnSub[0] - nextLLNSub.begin;

  useEffect(() => {
    const idx = ownSubs.findIndex((s) => s[0] >= nextLLNSub.begin + alignment);
    setNextSubIndex(idx == -1 ? 0 : idx);
  }, [alignment, selectedSub, hidden]);

  const onInputChange = (e) => {
    const newAlign = parseInt(e.target.value, 10) || 0;
    setAlignment(newAlign);
  };
  const onPrev = () => {
    const idx = nextSubIndex == 0 ? 0 : nextSubIndex - 1;
    setNextSubIndex(idx);
  };
  const onNext = () => {
    const idx =
      nextSubIndex + 1 == ownSubs?.length ? nextSubIndex : nextSubIndex + 1;
    setNextSubIndex(idx);
  };
  const onAlignClick = () => {
    if (nextAlignValue) {
      setAlignment(nextAlignValue);
    }
  };

  return (
    <Dialog title="Subtitle Alignment" hidden={hidden} onClose={onClose}>
      <div style="text-align: center;">
        <div style="margin-top: 20px;">{nextLLNSub?.text || "-"}</div>
        <div style="margin-top: 10px; margin-bottom: 10px">
          {nextOwnSub?.[2] || "-"}
        </div>
        <div>({nextAlignValue == alignment ? "aligned" : "not aligned"})</div>
        <div style="margin-top: 10px;">
          <a href="#" class="lln-btn" onClick={onPrev}>
            &lt;
          </a>
          <a href="#" class="lln-btn" onClick={onAlignClick}>
            Align
          </a>
          <a href="#" class="lln-btn" onClick={onNext}>
            &gt;
          </a>
        </div>
      </div>
      <hr style="margin: 20px;" />
      <div>
        <label htmlFor="nsl-align-input">Current alignment: </label>
        <input
          id="nsl-align-input"
          type="text"
          value={alignment.toString()}
          onChange={onInputChange}
          style="color: #000;"
        />
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  hidden: state.dialogs[DIALOGS.ALIGNMENT_DIALOG].hidden,
  options: state.dialogs[DIALOGS.ALIGNMENT_DIALOG].options,
  alignment: state.movie.alignment,
  selectedSub: state.subtitleList.selectedSub,
});

const mapDispatchToProps = {
  hideDialog,
  setAlignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlignmentDialog);
