import SubtitlesPanel from "./components/SubtitlesPanel";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <SubtitlesPanel />
  </Provider>
);

export default App;
