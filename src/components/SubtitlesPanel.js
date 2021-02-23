import { useRef, useEffect } from "react";
import { getData, parseSubtitle } from "../parsers/Parser";
import { connect } from "react-redux";
import {
  addSubtitle,
  selectSub,
  cacheSub,
  showDialog,
  clearSubs,
  DIALOGS,
} from "../redux/actions";
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
  movieId,
  clearSubs,
}) => {
  const inputFileRef = useRef(null);

  const onUpload = async (e) => {
    const file = e.target.files[0];
    e.target.value = null;

    const dataStr = await getData(file);
    const hash = hashFile(dataStr);
    const dup = subtitles.find((s) => s.hash === hash);

    if (dup) {
      selectSub(dup);
    } else {
      const parsedData = parseSubtitle(dataStr);
      if (parsedData === null) {
        alert("This subtitle could not be loaded");
        return;
      }

      const subtitle = {
        name: file.name,
        data: parsedData,
        movieId: movieId,
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
    clearSubs();
    const validSubs = cachedSubs.filter((s) => s.movieId === movieId);
    validSubs.forEach(addSubtitle);
    selectSub(OffSubtitle);
  }, [movieId]);

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
  movieId: state.movie.movieId,
});

const mapDispatchToProps = {
  addSubtitle,
  selectSub,
  cacheSub,
  showDialog,
  clearSubs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubtitlesPanel);
