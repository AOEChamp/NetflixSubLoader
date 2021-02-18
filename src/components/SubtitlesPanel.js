import { attachApp } from "../utils/Attacher";

const SubtitlesPanel = () => {
  return (
    <div class="track-list structural track-list-subtitles">
      <h3 class="list-header">External Subs</h3>
      <ul>
        <li
          class="track selected"
          tabindex="0"
          data-uia="track-subtitle-Japanese"
        >
          <span class="video-controls-check">
            <svg class="svg-icon svg-icon-nfplayerCheck" focusable="false">
              <use filter="" xlinkHref="#nfplayerCheck"></use>
            </svg>
          </span>
          Japanese [CC]
        </li>
        <li class="track" tabindex="0" data-uia="track-subtitle-Off">
          Off
        </li>
      </ul>
    </div>
  );
};

export default {
  show: () =>
    attachApp(SubtitlesPanel, ".popup-content.audio-subtitle-controller"),
};
