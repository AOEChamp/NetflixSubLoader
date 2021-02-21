import App from "./App";
import DisplayApp from "./DisplayApp";
import DialogApp from "./DialogApp";
import { attachApp } from "./utils/Attacher";

(() => {
  attachApp(App, ".popup-content.audio-subtitle-controller");
  attachApp(DisplayApp, "#lln-subs-content", (attachPoint, container) => {
    attachPoint.parentNode.insertBefore(container, attachPoint.nextSibling);
  });
  attachApp(DialogApp, "#lln-options-modal", (attachPoint, container) => {
    attachPoint.parentNode.insertBefore(container, attachPoint.nextSibling);
  });
})();
