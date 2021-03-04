import { render } from "react";

export const waitForSelector = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

export const onRemove = (element, callback) => {
  new MutationObserver((_mutations, _observer) => {
    if (!document.body.contains(element)) {
      callback();
    }
  }).observe(document.body, { childList: true, subtree: true });
};

export const attachApp = async (App, attachSelector, insertionCallback) => {
  const attachPoint = await waitForSelector(attachSelector);
  const container = document.createElement("div");
  insertionCallback
    ? insertionCallback(attachPoint, container)
    : attachPoint.append(container);
  onRemove(container, async () => {
    const newAttachPoint = await waitForSelector(attachSelector);
    insertionCallback
      ? insertionCallback(newAttachPoint, container)
      : newAttachPoint.append(container);
  });
  render(<App />, container);
};
