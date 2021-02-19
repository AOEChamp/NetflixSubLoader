import App from "./App";
import DialogApp from "./DialogApp";
import { attachApp } from "./utils/Attacher";

(() => {
  attachApp(App, ".popup-content.audio-subtitle-controller");
  attachApp(DialogApp, "#lln-subs-content", (attachPoint, container) => {
    attachPoint.parentNode.insertBefore(container, attachPoint.nextSibling);
  });
})();
