import { render } from "preact";

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

export const attachApp = async (App, attachSelector) => {
  const netflix = await waitForSelector("#appMountPoint");
  const attachPoint = attachSelector
    ? await waitForSelector(attachSelector)
    : netflix.parent;
  const container = document.createElement("div");
  attachPoint.append(container);
  onRemove(container, async () => {
    const newAttachPoint = await waitForSelector(attachSelector);
    newAttachPoint.append(container);
  });
  render(<App />, container);
};
