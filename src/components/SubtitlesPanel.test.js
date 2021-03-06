import SubtitlesPanel from "./SubtitlesPanel";
import { screen, cleanup, fireEvent } from "@testing-library/preact";
import { selectSub, cacheSub } from "../redux/actions";

describe("subtitles panel", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders two subtitles", async () => {
    const state = getDummyState();
    state.subtitleList.subtitles = [
      {
        name: "sub 1",
      },
      {
        name: "sub 2",
      },
    ];
    state.subtitleList.selectedSub = { name: "sub 2" };
    renderWithState(<SubtitlesPanel />, state);
    const items = await screen.findAllByText(/sub/);
    expect(items).toHaveLength(2);
    expect(items[1].classList).toContain("selected");
  });

  test("when selected changes", async () => {
    let state = getDummyState();
    state.subtitleList.subtitles = [
      {
        name: "sub 1",
      },
      {
        name: "sub 2",
      },
    ];
    state.subtitleList.selectedSub = { name: "sub 2" };
    const store = renderWithState(<SubtitlesPanel />, () => state);

    expect(screen.getByText(/sub 2/).classList).toContain("selected");
    state.subtitleList.selectedSub = { name: "sub 1" };
    state = { ...state };
    store.refresh();
    expect(screen.getByText(/sub 1/).classList).toContain("selected");
  });

  test("selects subtitle when clicked", async () => {
    const state = getDummyState();
    state.subtitleList.subtitles = [
      {
        name: "sub 1",
      },
    ];
    state.subtitleList.selectedSub = { name: "none" };
    const store = renderWithState(<SubtitlesPanel />, state);
    store.dispatch.mockClear();
    fireEvent.click(screen.getByText(/sub 1/));
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      selectSub(state.subtitleList.subtitles[0])
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      cacheSub(state.subtitleList.subtitles[0])
    );
  });

  test("off clicked", async () => {
    const state = getDummyState();
    state.subtitleList.subtitles = [
      {
        name: "sub 1",
      },
    ];
    state.subtitleList.selectedSub = { name: "sub 1" };
    const store = renderWithState(<SubtitlesPanel />, state);
    store.dispatch.mockClear();
    fireEvent.click(screen.getByText(/Off/));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(selectSub({ name: "Off" }));
  });
});
