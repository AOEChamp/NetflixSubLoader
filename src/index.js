import App from "./App";
import DisplayApp from "./DisplayApp";
import DialogApp from "./DialogApp";
import { attachApp } from "./utils/Attacher";
import store from "./redux/store";
import { setMovieId } from "./redux/actions";
import { onUrlChange } from "./utils/Utils";
import { getMovieId } from "./utils/LLNInterface";

(() => {
  attachApp(App, "#appMountPoint .popup-content.audio-subtitle-controller");
  attachApp(
    DisplayApp,
    "#appMountPoint #lln-subs-content",
    (attachPoint, container) => {
      attachPoint.parentNode.insertBefore(container, attachPoint.nextSibling);
    }
  );
  attachApp(
    DialogApp,
    "#appMountPoint #lln-options-modal",
    (attachPoint, container) => {
      attachPoint.parentNode.insertBefore(container, attachPoint.nextSibling);
    }
  );
  onUrlChange(() => {
    const movieId = getMovieId();
    if (store.getState().movie.movieId !== movieId) {
      store.dispatch(setMovieId(movieId));
    }
  });
})();
