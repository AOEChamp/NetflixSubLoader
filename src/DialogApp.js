import SubtitleDisplay from "./components/SubtitleDisplay";
import { Provider } from "react-redux";
import store from "./redux/store";

const DialogApp = () => (
  <Provider store={store}>
    <SubtitleDisplay />
  </Provider>
);

export default DialogApp;
