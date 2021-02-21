import AlignmentDialog from "./components/AlignmentDialog";
import { Provider } from "react-redux";
import store from "./redux/store";

const DialogApp = () => (
  <Provider store={store}>
    <AlignmentDialog />
  </Provider>
);

export default DialogApp;
