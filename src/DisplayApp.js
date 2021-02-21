import SubtitleDisplay from "./components/SubtitleDisplay";
import { Provider } from "react-redux";
import store from "./redux/store";

const DisplayApp = () => (
  <Provider store={store}>
    <SubtitleDisplay />
  </Provider>
);

export default DisplayApp;
