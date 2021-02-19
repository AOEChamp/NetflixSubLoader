import { useRef } from "react";
import { parseSubtitle } from "../parsers/Parser";
import { connect } from "react-redux";
import { addSubtitle } from "../redux/actions";

const SubtitleEntry = ({ name, isSelected }) => {
  if (isSelected) {
    return (
      <li class="track selected" tabindex="0">
        <span class="video-controls-check">
          <svg class="svg-icon svg-icon-nfplayerCheck" focusable="false">
            <use filter="" xlinkHref="#nfplayerCheck"></use>
          </svg>
        </span>
        {name}
      </li>
    );
  }
  return (
    <li class="track" tabindex="0">
      {name}
    </li>
  );
};

const SubtitlesPanel = ({ subtitles, addSubtitle }) => {
  const inputFileRef = useRef(null);
  const onUpload = async (e) => {
    const file = e.target.files[0];
    const subtitle = await parseSubtitle(file);
    addSubtitle({ name: file.name, data: subtitle });
  };
  return (
    <div class="track-list structural track-list-subtitles">
      <h3 class="list-header">External Subs</h3>
      <ul>
        {subtitles.map(({ name }) => (
          <SubtitleEntry name={name} isSelected={false} />
        ))}
        <li class="track" tabindex="0">
          Off
        </li>
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
});

const mapDispatchToProps = {
  addSubtitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesPanel);
