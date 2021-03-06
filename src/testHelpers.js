import { render, act } from "@testing-library/preact";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

global.getDummyState = () => ({
  subtitleList: {
    subtitles: [],
    selectedSub: {},
  },
  subCache: [],
  movie: {
    movieId: 0,
  },
});

global.renderWithState = (component, state) => {
  const store = configureStore([])(state);
  const oldDispatch = store.dispatch;
  store.refresh = () => act(() => oldDispatch({ type: "none" }));
  store.dispatch = jest.fn();
  render(<Provider store={store}>${component}</Provider>);
  return store;
};
