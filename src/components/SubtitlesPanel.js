import { useRef, useEffect } from "react";
import { getData, parseSubtitle } from "../parsers/Parser";
import { connect } from "react-redux";
import {
  addSubtitle,
  selectSub,
  cacheSub,
  showDialog,
  DIALOGS,
} from "../redux/actions";
import { getMovieId } from "../utils/LLNInterface";
import { hashFile } from "../utils/Utils";

const OffSubtitle = { name: "Off" };

const SubtitleEntry = ({ subtitle, isSelected, selectSub }) => {
  const onSelect = () => {
    selectSub(subtitle);
  };
  if (isSelected) {
    return (
      <li class="track selected">
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
    <li class="track" onClick={onSelect}>
      {subtitle.name}
    </li>
  );
};

const TrackButton = ({ title, onClick }) => {
  return (
    <li class="track" onClick={onClick}>
      {title}
    </li>
  );
};

const SubtitlesPanel = ({
  subtitles,
  selectedSub,
  cachedSubs,
  addSubtitle,
  selectSub,
  cacheSub,
  showDialog,
}) => {
  const inputFileRef = useRef(null);
  const movieIdRef = useRef(getMovieId());

  const onUpload = async (e) => {
    const file = e.target.files[0];

    const dataStr = await getData(file);
    const hash = hashFile(dataStr);

    if (!subtitles.find((s) => s.hash === hash)) {
      const parsedData = parseSubtitle(dataStr);

      const subtitle = {
        name: file.name,
        data: parsedData,
        movieId: movieIdRef.current,
        hash: hash,
      };
      addSubtitle(subtitle);
      selectSub(subtitle);
      cacheSub(subtitle);
    }
  };

  const onSubSelected = (subtitle) => {
    selectSub(subtitle);
    if (subtitle != OffSubtitle) {
      cacheSub(subtitle);
    }
  };

  useEffect(() => {
    if (subtitles.length == 0) {
      const validSubs = cachedSubs.filter(
        (s) => s.movieId === movieIdRef.current
      );
      validSubs.forEach(addSubtitle);
    }
    if (!selectedSub.name) {
      selectSub(OffSubtitle);
    }
  }, []);

  const showAlignDialog = () => {
    showDialog(DIALOGS.ALIGNMENT_DIALOG, {});
  };

  return (
    <div class="track-list structural track-list-subtitles">
      <h3 class="list-header">External Subs</h3>
      <ul>
        {subtitles.map((subtitle) => (
          <SubtitleEntry
            subtitle={subtitle}
            isSelected={subtitle.name === selectedSub.name}
            selectSub={onSubSelected}
          />
        ))}
        <SubtitleEntry
          subtitle={OffSubtitle}
          isSelected={OffSubtitle.name === selectedSub.name}
          selectSub={onSubSelected}
        />
        <TrackButton title="Align" onClick={showAlignDialog} />
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
  cachedSubs: state.subCache,
});

const mapDispatchToProps = {
  addSubtitle,
  selectSub,
  cacheSub,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesPanel);
