import { waitForSelector, onRemove, attachApp } from "./Attacher";
import { render, screen, cleanup } from "@testing-library/preact";

describe("waitForSelector", () => {
  test("rendered immediately", () => {
    const { container } = render(<div id="attach-point" />);
    return waitForSelector("#attach-point").then((element) => {
      expect(element).toBe(container.children[0]);
    });
  });
  test("with delay", () => {
    setTimeout(() => render(<div id="attach-point" />), 2000);
    return waitForSelector("#attach-point").then((element) => {
      expect(element.id).toBe("attach-point");
    });
  });
});

describe("onRemove", () => {
  test("element removed", (done) => {
    const { container } = render(<div id="attach-point" />);
    onRemove(container, () => done());
    cleanup();
  });
});

describe("attachApp", () => {
  test("app re-attaches when container is changed", async () => {
    const App = () => <div id="app" data-testid="app" />;
    attachApp(App, "#attach-point");
    const { container: container1 } = render(<div id="attach-point" />);
    let appElement = await screen.findByTestId("app");
    expect(appElement?.parentNode?.parentNode).toBe(container1.children[0]);

    cleanup();
    const { container: container2 } = render(<div id="attach-point" />);
    appElement = await screen.findByTestId("app");
    expect(appElement?.parentNode?.parentNode).toBe(container2.children[0]);
    cleanup();
  });
});
