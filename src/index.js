import App from "./App";
import { attachApp } from "./utils/Attacher";

(() => {
  attachApp(App, ".popup-content.audio-subtitle-controller");
})();
