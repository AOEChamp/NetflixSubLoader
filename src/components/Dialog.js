import { useEffect, useRef } from "react";
import { pauseVideo } from "../utils/LLNInterface";
const Dialog = ({ children, title, onClose, hidden, pauseOnShow = true }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (pauseOnShow && !hidden) {
      pauseVideo();
    }
  }, [hidden]);
  const onModalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target == modalRef.current) {
      onClose();
    }
  };
  const onCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };
  return (
    <div>
      {!hidden && (
        <div class="lln-modal" onClick={onModalClick} ref={modalRef}>
          <div class="lln-modal-content lln-options" style="padding-bottom: 0;">
            <div class="lln-modal-title">{title}</div>
            <a
              href="#"
              class="lln-close-modal lln-close-modal-btn"
              onClick={onCloseClick}
            ></a>
            <div class="lln-options-scroller">
              <div class="lln-options-wrap">{children}</div>
            </div>
            <div
              class="lln-modal-buttons lln-clearfix"
              style="padding: 7px 0; height: 52px; box-sizing: border-box;"
            >
              <a
                href="#"
                class="lln-btn"
                style="margin-right: 12px; padding: 0 26px; line-height: 36px;"
                onClick={onCloseClick}
              >
                Close
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
