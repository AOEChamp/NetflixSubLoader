import { useRef, useEffect } from "react";
import { parseSubtitle } from "../parsers/Parser";
import { connect } from "react-redux";
import { addSubtitle, selectSub } from "../redux/actions";

const OffSubtitle = { name: "Off" };

const SubtitleEntry = ({ subtitle, isSelected, selectSub }) => {
  const onSelect = () => {
    selectSub(subtitle);
  };
  if (isSelected) {
    return (
      <li class="track selected" tabindex="0">
        <span class="video-controls-check">
          <svg class="svg-icon svg-icon-nfplayerCheck" focusable="false">
            <use filter="" xlinkHref="#nfplayerCheck"></use>
          </svg>
        </span>
        {subtitle.name}
      </li>
    );
  }
  return (
    <li class="track" tabindex="0" onClick={onSelect}>
      {subtitle.name}
    </li>
  );
};

const SubtitlesPanel = ({ subtitles, selectedSub, addSubtitle, selectSub }) => {
  const inputFileRef = useRef(null);
  const onUpload = async (e) => {
    const file = e.target.files[0];
    const subData = await parseSubtitle(file);
    const subtitle = { name: file.name, data: subData };
    addSubtitle(subtitle);
    selectSub(subtitle);
  };

  useEffect(() => {
    if (!selectedSub.name) {
      selectSub(OffSubtitle);
    }
  }, []);

  return (
    <div class="track-list structural track-list-subtitles">
      <h3 class="list-header">External Subs</h3>
      <ul>
        {subtitles.map((subtitle) => (
          <SubtitleEntry
            subtitle={subtitle}
            isSelected={subtitle.name === selectedSub.name}
            selectSub={selectSub}
          />
        ))}
        <SubtitleEntry
          subtitle={OffSubtitle}
          isSelected={OffSubtitle.name === selectedSub.name}
          selectSub={selectSub}
        />
      </ul>
      <a
        href="#"
        class="lln-btn"
        style="background-color: #0074ba; line-height: 12px;"
        onClick={() => inputFileRef.current.click()}
      >
        Upload
      </a>
      <input
        type="file"
        name="name"
        style="display: none;"
        ref={inputFileRef}
        onChange={onUpload}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  subtitles: state.subtitleList.subtitles,
  selectedSub: state.subtitleList.selectedSub,
});

const mapDispatchToProps = {
  addSubtitle,
  selectSub,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesPanel);
